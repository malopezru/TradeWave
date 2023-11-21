from django.http import JsonResponse
from rest_framework.views import APIView
from ..models.stock_prediction import stock_prediction
import json

class StockPriceView(APIView):
    def get(self, request):
        symbol=request.GET.get('symbol')
        stock = stock_prediction.objects.get(stock_name=symbol)
            # Suponiendo que 'historic_data' es una lista y 'prediction_data' es un número
        historic_data = json.loads(stock.historic_data)
        results={
            'actual_price': historic_data[0]
        }
        
        return JsonResponse(results, safe=False)
    