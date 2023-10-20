import pandas as pd
import numpy as np
import json
from yahoo_fin import stock_info as si
from datetime import datetime
from pandas_datareader.data import DataReader
import yfinance as yf
from pandas_datareader import data as pdr

class StockDataDownloader:
    def __init__(self):
        self.symbol=""
        self.historical_data=None
    def getStockSymbols():
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
        return symbols
    def getHistoricalData(self):
        data=yf.download(self.symbol, period="60d", interval="15m")
        return data.filter(['Close'])
