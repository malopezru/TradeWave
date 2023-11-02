from .services.dataDownloader import StockDataDownloader
from .services.predict import StockPredictor
from .models.stock_prediction import stock_prediction
import numpy as np

def downloadStockInfo():
    
    downloader = StockDataDownloader()
    stock_data, status = downloader.download_stock_info()

    # Iterar sobre los datos de las acciones descargadas
    for symbol, value in stock_data.items():

        # Limpiar el símbolo de la acción
        symbol = symbol.replace(" ", "")
        stock_prediction_ = stock_prediction.objects.get(stock_name=symbol)
        try:
            # Obtener los datos históricos de la acción
            historic_data_str = stock_prediction_.historic_data
            historic_data_str = historic_data_str.replace("[", "").replace("]", "")
            historic_data_list = historic_data_str.split(",")
            historic_data = np.array(list(map(float, historic_data_list)))
            historic_data = historic_data.reshape(-1, 1)
            if(len(historic_data)<10):
                continue
            # Realizar la predicción de la acción
            predictor = StockPredictor(historic_data)
            prediction = predictor.predict()

            # Ajustar la predicción para que coincida con los datos históricos
            difference = prediction[0] - historic_data[-1]
            prediction = prediction - difference

            # Guardar la predicción en la base de datos
            stock_prediction_.prediction_data = prediction.tolist()
            stock_prediction_.save()

        except Exception as e:
            stock_prediction_.delete()

def fillStockInfo():
    import requests
    response = requests.get('http://localhost:7651/stock_prediction/')
