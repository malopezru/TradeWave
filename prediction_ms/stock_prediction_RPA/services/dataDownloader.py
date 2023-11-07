import pandas as pd
import numpy as np
import json
from yahoo_fin import stock_info as si
from datetime import datetime
from pandas_datareader.data import DataReader
import yfinance as yf
from pandas_datareader import data as pdr
from ..models.stock_prediction import stock_prediction
from django.utils import timezone

class StockDataDownloader:
    def __init__(self):
        self.symbol=""
        self.historical_data=None
    def getStockSymbols(self):
        index_names = ['tickers_sp500', 'tickers_nasdaq', 'tickers_dow', 'tickers_other']
        # create an empty set to hold the symbols
        symbols = set()
        # iterate over the index names and add the symbols to the set
        for index_name in index_names:
            df = pd.DataFrame(getattr(si, index_name)())
            symbols.update(df[0].values.tolist())
        # remove unwanted symbols
        unwanted_suffixes = ['W', 'R', 'P', 'Q']
        symbols = [symbol for symbol in symbols if len(symbol) <= 4 or symbol[-1] not in unwanted_suffixes]
        # eliminar vacios
        symbols = [symbol for symbol in symbols if symbol]
        # filtrar los símbolos válidos
        valid_symbols = []
        for symbol in symbols:
            # excluir los símbolos que contienen caracteres no alfanuméricos
            if not symbol.isalnum():
                continue
            # excluir los símbolos que tienen una longitud inapropiada
            if len(symbol) < 2 or len(symbol) > 5:
                continue
            # excluir los símbolos que no son válidos según las reglas de la bolsa de valores
            if symbol.startswith('.') or symbol.endswith('.'):
                continue
            valid_symbols.append(symbol)
        # convertir la lista de símbolos válidos a un conjunto y luego a una lista
        valid_symbols = list(set(valid_symbols))
        # ordenar la lista de símbolos válidos alfabéticamente
        valid_symbols.sort()
        # retornar la lista de símbolos válidos
        return valid_symbols
    def getStockData(self, symbol, years):
        if symbol:
        # Set up End and Start times for data grab
            end = datetime.now()
            start = datetime(end.year - years, end.month, end.day)

            # Download the historical data for the given symbol
            data = yf.download(symbol, start, end)

            # Filter the data to only include the 'Close' column
            data = data.filter(['Close'])
            

            return data.values
        else:
            return None
    def download_stock_info(self):
        stockDataDownloader = StockDataDownloader()
        symbols = stockDataDownloader.getStockSymbols()
        # solo se realiza con las primeras 50 por temas de tiempo de ejecucion
        symbols=symbols[:5]

        # Crear un conjunto de pares de símbolo con su último precio
        stock_data = {}
        for symbol in symbols:
            symbol=symbol.replace(" ","")
            data = stockDataDownloader.getStockData(symbol, 1)
            if(len(data)<10):
                #delete from symbols this symbol
                symbols.remove(symbol)
                continue
                
            data=[dat[0] for dat in data]
            last_price = data[-1]
            stock_data[symbol] = last_price
            try:
                current_time = timezone.now()
                prediction = stock_prediction.objects.get(stock_name=symbol)
                prediction.historic_data = data
                prediction.created_at = current_time
                prediction.save()
            except stock_prediction.DoesNotExist:
                stock_prediction.objects.create(stock_name=symbol, historic_data=data)

        return stock_data, 200
    
