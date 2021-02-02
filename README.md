# django-react-rabbitMQ-microservices-social-app

This project is developed with python Django/Flask micro-services communicating through a RabbitMQ Event Bus. Frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation Steps

This project required Docker to be installed.  

**Runing the Services**  

- Clone the project
- Navigate to a service directory (admin or main)
- Run `docker-compose up`  

To Run other services:  
- Follow the same steps above, navigating to the relavant service directory  

**Admin App (Django)** runs on `0.0.0.0:8000`  

**Main App (Flask)** runs on `0.0.0.0:8001`  

***

**Migrating Database**  

- Navigate to a service directory (admin or main)
- Run `docker compose exec backend sh`
- Run below commands on Interactive shell loaded  

- `python manage.py makemigrations`
- `python manage.py migrate`

***

### Running FrontEnd with ReactJs

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


