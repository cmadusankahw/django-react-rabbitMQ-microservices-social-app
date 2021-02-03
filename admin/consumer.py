import json
import pika
import logging
import os
import django

from configs.constants import admin_queue
from configs.keys import rabbit_MQ_pass

# Required before importing Product module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admin.settings")
django.setup()

from products.models import Product

logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

params = pika.URLParameters(rabbit_MQ_pass)

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue=admin_queue)


# function to run when an event is triggered
def callback(ch, method, properties, body):
    logging.info('Received in admin')  # test
    pid = json.loads(body)
    logging.info('Data Received: %s', pid)  # test
    product = Product.objects.get(id=pid)
    product.likes = product.likes + 1
    product.save()
    logging.info('Product likes added')


channel.basic_consume(queue=admin_queue, on_message_callback=callback, auto_ack=True)

logging.info('Started Consuming')

channel.start_consuming()

channel.close()
