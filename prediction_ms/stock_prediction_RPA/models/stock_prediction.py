from django.db import models

class stock_prediction(models.Model):
    stock_name = models.CharField(max_length=50)
    historic_data= models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    #json with prediction data json
    prediction_data = models.TextField()
    class Meta:
        db_table = 'stock_prediction'
        ordering = ['-created_at']
    
    




