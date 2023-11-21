import requests
import time
tiempo=30
#el tiempo se debe modificar dependiendo de cuanto tarde en levantarse el servidor
print("Esperando",tiempo," segundos para levantar el servidor")
time.sleep(tiempo)
requests.get('http://localhost:7651/stock_prediction/')