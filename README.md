# django-react-rabbitMQ-microservices-social-app

This project is based on python dJango/Flask micro-services communicating through a RabbitMQ Event Bus

### Installation Steps

This project required Docker to be installed.  

**Runing the Services**  

- Clone the project
- Navigate to a service directory (admin or main)
- Run `docker-compose up`  

To Run other services:  
- Follow the same steps above, navigating to the relavant service directory  

**Admin App (dJango)** runs on `0.0.0.0:8000`  

**Main App (Flask)** runs on `0.0.0.0:8001`  

***

**Migrating Database**  

- Navigate to a service directory (admin or main)
- Run `docker compose exec backend sh`
- Run below commands on Interactive shell loaded  

- `python manage.py makemigrations`
- `python manage.py migrate`

***

