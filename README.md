### Two-factor authentication

 Implemented the simple API of a simple two-factor authentication solution using Node.js (express) with TypeScript..

The simple API has the following features:
- Ability to create a six-digit authentication code (one-time password, OTP) that expires after a predefined amount of time, say 60 seconds.
- Ability to send via SMS the above authentication code to a phone number. For now, I am just showing it on the console on the backend. Please check api server logs to see this code.
- Ability to validate the authentication code with the one entered by the user.



### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#Installing
>Install node
>nvm install v12.10.0

Database postgresql
>brew install postgres

Clone the repository

>git clone https://github.com/waqasnazir15/two-factor.git

>cd two-factor

> yarn install


## Create database
 After installing postgres, run following commands to create database and tables required for this api

> CREATE DATABASE two_factor;


Create User Table;


>CREATE TABLE users (
	user_id serial PRIMARY KEY,
	phone_number VARCHAR ( 50 ) UNIQUE NOT NULL,
	code VARCHAR ( 6 ) UNIQUE NOT NULL,
  expired_at TIMESTAMP
);



## Setup
- Update variables in .env file to connect with created database

#### Start Api
run following command

> yarn start

Now the backend api is running at.
> http://localhost:4000/
