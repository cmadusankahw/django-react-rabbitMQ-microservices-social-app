# amqps://qenxroax:***@barnacle.rmq.cloudamqp.com/qenxroax

import pika

params = pika.URLParameters('amqps://qenxroax:***@barnacle.rmq.cloudamqp.com/qenxroax')

connection = pika.BlockingConnection(params)

channel = connection.channel()

def publish(method, body):
    channel.basic_publish(exchange='', routing_key='admin', body='hello')