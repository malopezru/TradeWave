from rest_framework import serializers
from ..models.stock_prediction import stock_prediction

class stock_prediction_serializer(serializers.ModelSerializer):
    class Meta:
        model = stock_prediction
        fields = '__all__'