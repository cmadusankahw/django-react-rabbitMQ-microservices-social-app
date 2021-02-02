
import json
import pika

from configs.constants import admin_queue
from configs.keys import rabbit_MQ_pass

params = pika.URLParameters(f'amqps://qenxroax:{rabbit_MQ_pass}@barnacle.rmq.cloudamqp.com/qenxroax')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key=admin_queue, body=json.dumps(body), properties=properties)
