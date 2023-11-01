FROM python:3.10.6

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install --upgrade setuptools
RUN apt-get update && apt-get install -y cron
RUN pip install -r requirements.txt
COPY . /code/
COPY script.sh /script.sh
RUN chmod +x /script.sh
CMD ["/script.sh"]
ARG URL=0.0.0.0:7651
#RUN python manage.py makemigrations
#RUN python manage.py migrate
#print ip adrees


#CMD ["sh", "-c", "python manage.py makemigrations stock_prediction_RPA && python manage.py migrate && python manage.py runserver $URL"] 
# Script de creación de superusuario
#RUN python create_superuser.py
EXPOSE 7651