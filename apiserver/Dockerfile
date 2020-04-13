FROM python:3.7

WORKDIR /usr/src/app
RUN pip install pipenv
COPY Pipfile* ./
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

RUN flask init-db

CMD ["flask", "run", "--host", "0.0.0.0"]