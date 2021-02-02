import pika
import logging

from configs.constants import admin_queue
from configs.keys import rabbit_MQ_pass

logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

params = pika.URLParameters(f'amqps://qenxroax:{rabbit_MQ_pass}@barnacle.rmq.cloudamqp.com/qenxroax')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue=admin_queue)


# function to run when an event is triggered
def callback(ch, method, properties, body):
    logging.info('Received in admin')  # test
    logging.info(body)


channel.basic_consume(queue=admin_queue, on_message_callback=callback, auto_ack=True)

logging.info('Started Consuming')

channel.start_consuming()

channel.close()
