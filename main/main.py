import requests
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
from sqlalchemy import UniqueConstraint

from configs.constants import service_host, user_API, API_prefix
from configs.keys import mysql_user, mysql_pass, mysql_host, mysql_db_main

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f'mysql://{mysql_user}:{mysql_pass}@{mysql_host}/{mysql_db_main}'
CORS(app)  # enabling CORS policies for front-end app

db = SQLAlchemy(app)  # creating mysql database


@dataclass  # to make Product object serializable
class Product(db.Model):  # Product imported from django app through RabbitMQ
    id: int
    title: str
    image: str
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))


@dataclass  # to make ProductUser object serializable
class ProductUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    product_id = db.Column(db.Integer)

    UniqueConstraint('user_id', 'product_id', name='user_product_unique')


@app.route(f'{API_prefix}')  # not required to mention method for GET
def index():
    return jsonify(Product.query.all())


@app.route(f'{API_prefix}<int:id>/like', methods=['POST'])
def like(id):
    req = requests.get(user_API)
    return jsonify(req.json())


if __name__ == '__main__':
    app.run(debug=True, host=service_host)
