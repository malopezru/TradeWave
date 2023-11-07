FROM python:3.10.6

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --upgrade pip && pip install --upgrade setuptools
RUN pip install -r requirements.txt
RUN apt-get update && apt-get upgrade -y && apt-get install -y --fix-missing cron
COPY . /code/

