FROM python:3.10.6

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install --upgrade setuptools
RUN pip install -r requirements.txt
COPY . /code/
ARG URL=0.0.0.0:7651

#CMD ["sh", "-c", "python manage.py makemigrations stock_prediction_RPA && python manage.py migrate && python manage.py runserver $URL"] 
# Script de creación de superusuario
#RUN python create_superuser.py
RUN python manage.py runserver