
import json
import pika

from configs.constants import main_queue
from configs.keys import rabbit_MQ_pass

params = pika.URLParameters(rabbit_MQ_pass)

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key=main_queue, body=json.dumps(body), properties=properties)
