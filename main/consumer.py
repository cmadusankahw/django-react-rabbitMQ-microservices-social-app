import logging
import json
import pika

from configs.constants import main_queue, event_deleted, event_updated, event_created
from configs.keys import rabbit_MQ_pass
from main import Product, db

logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

params = pika.URLParameters(rabbit_MQ_pass)

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue=main_queue)


# function to run when an event is triggered
def callback(ch, method, properties, body):
    logging.info('Received in main')  # test
    data = json.loads(body)
    logging.info('Data Received: %s', data)  # test

    if properties.content_type == event_created:
        product = Product(id=data['id'], title=data['title'], image=data['image'])
        # creating the object with SQLAlchemy
        db.session.add(product)
        db.session.commit()
        logging.info('Product created')

    elif properties.content_type == event_updated:
        product = Product.query.get(data['id'])
        product.title = data['title']
        product.image = data['image']
        # updated the object with SQLAlchemy
        db.session.commit()
        logging.info('Product updated')

    elif properties.content_type == event_deleted:
        product = Product.query.get(data)
        # deleting the object in SQLAlchemy
        db.session.delete(product)
        db.session.commit()
        logging.info('Product deleted')


channel.basic_consume(queue=main_queue, on_message_callback=callback, auto_ack=True)

logging.info('Started Consuming')

channel.start_consuming()

channel.close()
