#!/bin/bash
python manage.py makemigrations --noinput 
python manage.py migrate 
python stock_prediction_RPA/on_boot.py
python manage.py crontab add
python manage.py runserver 0.0.0.0:7651