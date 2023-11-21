# Importamos las bibliotecas necesarias
from django.http import JsonResponse
from rest_framework.views import APIView
from ..models.stock_prediction import stock_prediction
import json

# Definimos una vista basada en clases para obtener información sobre una acción
class StockInfoView(APIView):
    # Definimos el método GET para esta vista
    def get(self, request):
        # Obtenemos el nombre de la acción de los parámetros de la solicitud
        name = request.GET.get('name')

        # Obtenemos la predicción de la acción de la base de datos
        stock_prediction_list = stock_prediction.objects.get(stock_name=name)
        results = []

        # Convertimos los datos históricos de la acción a una lista de floats
        historic_data = json.loads(stock_prediction_list.historic_data)
        historic_data = list(map(float, historic_data))

        # Convertimos los precios predichos a una lista de floats
        predicted_prices = json.loads(stock_prediction_list.prediction_data)
        predicted_prices = [price[0] for price in predicted_prices]

        # Obtenemos el último precio histórico
        last_price = historic_data[-1]

        # Generamos un mensaje basado en si el último precio predicho es mayor que el último precio histórico
        message = 'Buy!' if predicted_prices[-1] > last_price else 'Don\'t buy!'

        # Añadimos los datos de la acción a los resultados
        results.append({
            'data': stock_prediction_list.stock_name,
            'historic data': historic_data,
            'predicted prices': predicted_prices,
            'message': message
        })

        # Devolvemos los resultados como una respuesta JSON
        return JsonResponse(results, safe=False)