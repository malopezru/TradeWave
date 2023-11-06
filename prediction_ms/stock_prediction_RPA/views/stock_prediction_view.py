from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.utils.decorators import method_decorator
from django.shortcuts import render
from ..models.stock_prediction import stock_prediction
from ..services.predict import StockPredictor
from django.utils import timezone
from ..services.dataDownloader import StockDataDownloader

class StockPredictionView(APIView):
    def get(self, request):
        stock_prediction_list = stock_prediction.objects.all()
        # Descargar información de acciones
       
        # Devolver una respuesta JSON
        return JsonResponse(stock_data, status=status, safe=False)