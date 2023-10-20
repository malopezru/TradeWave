from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.utils.decorators import method_decorator
from django.shortcuts import render
from ..models.stock_prediction import stock_prediction
import datetime
import subprocess
import json
import os
import pandas as pd
import numpy as np
from yahoo_fin import stock_info as si
from datetime import datetime
from pandas_datareader.data import DataReader
import yfinance as yf
from pandas_datareader import data as pdr
from predict import StockPredictor
from django.utils import timezone
# For reading stock data from yahoo
def download_data(stock_name,years):
    end_date = datetime.now()
    start_date = datetime(end_date.year -years, end_date.month, end_date.day)
    data = pdr.get_data_yahoo(stock_name, start=start_date, end=end_date)
    print(data)
    return data.filter(['Close'])


class CrearRegistrosView(APIView):
    #get request
    
    def get(self, request):
        

# gather stock symbols from major US exchanges
        df1 = pd.DataFrame( si.tickers_sp500() )
        df2 = pd.DataFrame( si.tickers_nasdaq() )
        df3 = pd.DataFrame( si.tickers_dow() )
        df4 = pd.DataFrame( si.tickers_other() )

        # convert DataFrame to list, then to sets
        sym1 = set( symbol for symbol in df1[0].values.tolist() )
        sym2 = set( symbol for symbol in df2[0].values.tolist() )
        sym3 = set( symbol for symbol in df3[0].values.tolist() )
        sym4 = set( symbol for symbol in df4[0].values.tolist() )

        # join the 4 sets into one. Because it's a set, there will be no duplicate symbols
        symbols = set.union( sym1, sym2, sym3, sym4 )

        # Some stocks are 5 characters. Those stocks with the suffixes listed below are not of interest.
        my_list = ['W', 'R', 'P', 'Q']
        del_set = set()
        sav_set = set()

        for symbol in symbols:
            if len( symbol ) > 4 and symbol[-1] in my_list:
                del_set.add( symbol )
            else:
                sav_set.add( symbol )
        #symbols to json
        symbols = list(sav_set)

        return JsonResponse(symbols, status=200, safe=False)
    def post(self, request):
        try:
            # Lee los datos del cuerpo de la solicitud
            content_length = int(request.headers['Content-Length'])
            post_data = request.body
            # Convierte los datos a un objeto JSON
            json_data = json.loads(post_data)
            # Extrae los datos necesarios del objeto JSON
            symbol = json_data['name']
            dataset = json_data['data']
            #see if symbol ys on database
            if stock_prediction.objects.filter(stock_name=symbol).exists():
                prediction = stock_prediction.objects.get(stock_name=symbol)
                predictions = prediction.prediction_data
                created_at=prediction.created_at
                current_time = timezone.now()
                time_difference = current_time - created_at
                # Verifica si han pasado al menos 5 horas
                if time_difference.total_seconds() <= 5 * 60 * 60: 
                    return JsonResponse({'name': symbol, 'predictions': predictions, 'created_at':created_at}, status=200, safe=False)
            # Convertir data a numpy ndarray
            dataset = np.array(dataset)
            #split dataset in two and make dataset only the send have
            dataset = dataset[int(len(dataset)/2):]
    
            # Llama a la función predecir() con los datos proporcionados
            predictor = StockPredictor(dataset)
            predictions = predictor.predict()
            # Crea un diccionario con los resultados
            results = {
                'data': symbol,
                'predictions': predictions.tolist()
            }
            # Convierte el diccionario a formato JSON
            #verificar si existe el registro
            try:
                stock_prediction.objects.get(stock_name=symbol)
                stock_prediction.objects.filter(stock_name=symbol).update(prediction_data=predictions.tolist(),created_at=current_time)
            except stock_prediction.DoesNotExist:
                stock_prediction.objects.create(stock_name=symbol, prediction_data=predictions.tolist())

            
            return JsonResponse(results, status=200, safe=False)
        except Exception as e:
            # Manejar excepciones
            return JsonResponse({'error': str(e)}, status=500)






