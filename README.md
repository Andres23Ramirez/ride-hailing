# Ride-hailing API
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
This guide will walk you through the steps required to run a Dockerized NestJS application with PostgreSQL database using Docker Compose. The application you will be running is called "ride-hailing", which is a JSON RESTful API for a small ride-hailing service that uses Wompi API for monetary transactions.

### Prerequisites
* Docker and Docker Compose installed on your machine
* Basic knowledge of using the command line interface (CLI)

### Step 1: Clone the repository
First, clone the ride-hailing repository by running the following command in your terminal:
```sh
git clone https://github.com/Andres23Ramirez/ride-hailing.
```
### Step 2: Configure the environment variables
Next, create a new file called .env in the root directory of the project and add the following environment variables:
```sh
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=ride_hailing
```
These variables will be used by the application and PostgreSQL database to establish a connection.
### Step 3: Build and run the Docker containers
Navigate to the root directory of the project and run the following command to build and run the Docker containers:
```sh
docker-compose up --build
```
This will download all the required dependencies, build the Docker image, and start the containers. You should see output similar to the following:
```sh
Starting web ... done
Starting db ... done
db_1  | 2023-04-29 00:00:00.000 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
db_1  | 2023-04-29 00:00:00.000 UTC [1] LOG:  listening on IPv6 address "::", port 5432
db_1  | 2023-04-29 00:00:00.000 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
db_1  | 2023-04-29 00:00:00.000 UTC [20] LOG:  database system was shut down at 2023-04-29 00:00:00 UTC
db_1  | 2023-04-29 00:00:00.000 UTC [1] LOG:  database system is ready to accept connections
app_1 | Nest application successfully started
app_1 | Listening on port 3000
```
This indicates that the application and database containers are up and running.
### Step 4: Test the application
You can now test the application by sending HTTP requests to http://localhost:3000. For example, you can use a tool like cURL or Postman to send a GET request to http://localhost:3000/riders/ride. If everything is working correctly, you should receive a response containing ride started data response.
## Running local

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
