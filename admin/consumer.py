import pika
import logging

from configs.keys import rabbit_MQ_pass

logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

params = pika.URLParameters(f'amqps://qenxroax:{rabbit_MQ_pass}@barnacle.rmq.cloudamqp.com/qenxroax')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='admin')


def callback(ch, method, properties, body):
    logging.info('Received in admin')
    logging.info(body)


channel.basic_consume(queue='admin', on_message_callback=callback)

logging.info('Started Consuming')

channel.start_consuming()

channel.close()
