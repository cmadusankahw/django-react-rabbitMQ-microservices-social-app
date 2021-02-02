import pika
import logging

from configs.keys import rabbit_MQ_pass

logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

params = pika.URLParameters(f'amqps://qenxroax:{rabbit_MQ_pass}@barnacle.rmq.cloudamqp.com/qenxroax')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='main')


def callback(ch, method, properties, body):
    logging.info('Received in main')
    logging.info(body)


channel.basic_consume(queue='main', on_message_callback=callback)

logging.info('Started Consuming')

channel.start_consuming()

channel.close()
