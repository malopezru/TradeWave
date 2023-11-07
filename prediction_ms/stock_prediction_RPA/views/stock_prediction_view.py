from django.http import JsonResponse
from rest_framework.views import APIView
from ..models.stock_prediction import stock_prediction
import json

class StockPredictionView(APIView):
    def get(self, request):
        stock_prediction_list = stock_prediction.objects.all()
        results = []

        for stock in stock_prediction_list:
            # Suponiendo que 'historic_data' es una lista y 'prediction_data' es un número
            historic_data = json.loads(stock.historic_data)
            historic_data = list(map(float, historic_data))

            predicted_price = json.loads(stock.prediction_data)
            # Si predicted_price es un solo número en formato string
            predicted_price = predicted_price[1][0]
            last_price = historic_data[-1]
            message = 'Buy!' if predicted_price > last_price else 'Don\'t buy!'

            results.append({
                'data': stock.stock_name,
                'actual price': last_price,
                'predicted price': predicted_price,
                'message': message
            })

        return JsonResponse(results, safe=False)
    