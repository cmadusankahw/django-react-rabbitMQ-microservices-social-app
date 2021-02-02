# amqps://qenxroax:***@barnacle.rmq.cloudamqp.com/qenxroax

import pika

from configs.keys import rabbit_MQ_pass

params = pika.URLParameters(f'amqps://qenxroax:{rabbit_MQ_pass}@barnacle.rmq.cloudamqp.com/qenxroax')

connection = pika.BlockingConnection(params)

channel = connection.channel()


def publish(method, body):
    channel.basic_publish(exchange='', routing_key='main', body='hello main')
