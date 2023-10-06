from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.utils.decorators import method_decorator
from django.shortcuts import render
# from ..models.stock_prediction import stock_prediction
import datetime
import subprocess
import json
import os
import pandas as pd
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, LSTM
from datetime import datetime
from pandas_datareader.data import DataReader
import yfinance as yf
from pandas_datareader import data as pdr
from sklearn.preprocessing import MinMaxScaler  

def parse_json(json_str):
    # Parse the JSON string
    data = json.loads(json_str)

    # Extract the name and data
    name = data['name']
    data_arr = data['data']

    return name, data_arr
# For reading stock data from yahoo
def download_data(stock_name,years):
    end_date = datetime.now()
    start_date = datetime(end_date.year -years, end_date.month, end_date.day)
    data = pdr.get_data_yahoo(stock_name, start=start_date, end=end_date)
    print(data)
    return data.filter(['Close'])


def scale_data(dataset):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)
    return scaled_data, scaler
def split_data(scaled_data):
    training_data_len = int(len(scaled_data) * 0.8)
    train_data = scaled_data[0:training_data_len, :]
    x_train = []
    y_train = []
    for i in range(60, len(train_data)):
        x_train.append(train_data[i - 60:i, 0])
        y_train.append(train_data[i, 0])
    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
    return x_train, y_train, training_data_len



def create_model(x_train, y_train):
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
    model.add(LSTM(units=50, return_sequences=False))
    model.add(Dense(units=25))
    model.add(Dense(units=1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(x_train, y_train, batch_size=1, epochs=1)
    return model




def test_model(scaled_data, training_data_len, model,scaler,dataset):
    print("scaled_data")
    print(scaled_data)
    print("training_data_len")
    print(training_data_len)
    print("dataset")
    print(dataset)
    test_data = scaled_data[training_data_len - 60:, :]
    x_test = []
    y_test = dataset[training_data_len:, :]
    for i in range(60, len(test_data)):
        x_test.append(test_data[i - 60:i, 0])
    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
    predictions = model.predict(x_test)
    predictions = scaler.inverse_transform(predictions)
    return predictions, y_test

def predecir(dataset):
    scaled_data, scaler = scale_data(dataset)
    x_train, y_train, training_data_len = split_data(scaled_data)
    model = create_model(x_train, y_train)
    predictions, y_test = test_model(scaled_data, training_data_len, model, scaler, dataset)
    # Get the root mean squared error (RMSE)
    rmse = np.sqrt(np.mean(((predictions - y_test) ** 2)))
    return dataset, predictions, training_data_len
class CrearRegistrosView(APIView):
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
            # Convertir data a numpy ndarray
            dataset = np.array(dataset)
            # Llama a la función predecir() con los datos proporcionados
            data, predictions, training_data_len = predecir(dataset)
            # Crea un diccionario con los resultados
            # dataset to list
            dataset = list(dataset)
            results = {
                'data': symbol,
                'predictions': predictions.tolist()
            }
            # Convierte el diccionario a formato JSON
            json_response = json.dumps(results)
            #verificar si existe el registro
            """try:
                stock_prediction.objects.get(stock_name=symbol)
                stock_prediction.objects.filter(stock_name=symbol).update(prediction_data=json_response)
            except stock_prediction.DoesNotExist:
                stock_prediction.objects.create(stock_name=symbol, prediction_data=json_response)
                """
            return JsonResponse(json_response, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)






