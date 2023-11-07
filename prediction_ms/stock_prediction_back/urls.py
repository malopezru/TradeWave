"""
URL configuration for stock_prediction_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from stock_prediction_RPA.views.crear_registros_view import CrearRegistrosView
from stock_prediction_RPA.views.stock_prediction_view import StockPredictionView
from stock_prediction_RPA.views.stock_info_view import StockInfoView


urlpatterns = [
    path('stock_prediction/', CrearRegistrosView.as_view()),
    path('stock_prediction_list/', StockPredictionView.as_view()),
    path('stock_info/', StockInfoView.as_view()),

]
