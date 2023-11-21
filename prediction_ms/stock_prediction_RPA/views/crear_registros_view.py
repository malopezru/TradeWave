from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.utils.decorators import method_decorator
from django.shortcuts import render
from ..models.stock_prediction import stock_prediction
import json
import numpy as np
from ..services.predict import StockPredictor
from django.utils import timezone
from ..services.dataDownloader import StockDataDownloader
from ..cron import downloadStockInfo





class CrearRegistrosView(APIView):
    def get(self, request):
        # Descargar información de acciones
        downloadStockInfo()
        # Devolver una respuesta JSON
        return JsonResponse({'message': 'success'}, status=200)
        
    
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
           # print(dataset,len(dataset))
            current_time = timezone.now()
            
            #see if symbol ys on database
            if stock_prediction.objects.filter(stock_name=symbol).exists():
                prediction = stock_prediction.objects.get(stock_name=symbol)
                predictions = prediction.prediction_data
                predictions= predictions.replace("[","").replace("]","")
                predictions = predictions.split(",")
                predictions = list(map(float, predictions))
                created_at=prediction.created_at
                
                time_difference = current_time - created_at
                # Verifica si han pasado al menos 5 horas
                if time_difference.total_seconds() <= 5 * 60 * 60: 
                    predicted_price = predictions[1]
                    #dataset = list(map(float, dataset))
                    # Verificar si predicted_price es mayor que el último elemento de dataset
                    if predicted_price > dataset[len(dataset)-1][0]:
                        message = 'Buy!'
                    else:
                        message = 'Don\'t buy!'

                    # Crea un diccionario con los resultados
                    results = {
                        'data': symbol,
                        'actual price': dataset[len(dataset)-1][0],
                        'predicted price': predicted_price,
                        'message': message
                    }
                    return JsonResponse(results, status=200, safe=False)
            # Convertir data a numpy ndarray
            dataset = np.array(dataset)
            #split dataset in two and make dataset only the send have
            dataset = dataset[int(len(dataset)/2):]
    
            # Llama a la función predecir() con los datos proporcionados
            print(dataset)
            predictor = StockPredictor(dataset)
            predictions = predictor.predict()
            
            predictions = np.array(predictions)
            difference= predictions[0]-dataset[-1]
            predictions=predictions-difference
            # Convertir el primer elemento de predictions a un número flotante
            predicted_price = predictions.tolist()[1][0]

            # Convertir dataset a una lista de números flotantes
            dataset = list(map(float, dataset))

            # Verificar si predicted_price es mayor que el último elemento de dataset
            if predicted_price > dataset[-1]:
                message = 'Buy!'
            else:
                message = 'Don\'t buy!'

            # Crea un diccionario con los resultados
            results = {
                'data': symbol,
                'predicted price': predicted_price,
                'message': message
            }
            
            # Guardar los resultados en la base de datos
            try:
                prediction = stock_prediction.objects.get(stock_name=symbol)
                prediction.prediction_data = predictions.tolist()
                prediction.created_at = current_time
                prediction.save()
            except stock_prediction.DoesNotExist:
                stock_prediction.objects.create(stock_name=symbol, prediction_data=predictions.tolist(), created_at=current_time)
            
            return JsonResponse(results, status=200, safe=False)
        except Exception as e:
            # Manejar excepciones
            return JsonResponse({'error': str(e)}, status=500)






