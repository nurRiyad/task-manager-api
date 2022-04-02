# task-manager
---
A simple API server that can be used for creating, reading, updating, and deleting user accounts and user-specific tasks with complete and incomplete status. We also use the MongoDB database to store users data and their tasks.


# Main Feature
---
- Create user account with username and email address
- Get confirmation email for successfully creating account
- Upload & delete profile Picture
- Login from multiple account
- Logout out from single device
- Logout from all device
- Permanently delete an account along with it's all task
- Get confirmation mail after successfully deleting an account
- Create, Update & Delete a task
- Read a specific task
- Read all task of a specific user with sorting, pagination and filtering options
- Password are safely stored with hashing


# Installation
---
- Make sure you have properly installed nodejs and npm in your machine
- At the time of creating this project my nodejs & npm version is v16.14.2 & v8.5.0
- Make sure you have a MongoDB database running in your local machine, mine is v5.0.6 
- Now clone the code from github and run `npm install`
- Create a config file in the root directory of this project using `mkdir config`
- Go to the config folder using `cd config` and create dev.env file using `touch dev.env`
- Open dev.env & set four environment variable in that file 
  - PORT="YOUR_PREFERABLE_PORT"  *//the prot where your server will start listening*
  - SEND_IN_BLUE_API_KEY="YOUR_API_KEY" *//Set your own SendInBlue API key*
  - MONGOD_URL="YOUR_DATABASE_PORT" *//Set your local database url where it is listening*
  - JWT_SECRET="YOUR_PREFERABLE_SECRET_KEY" *//any secret key you wanna set*
  - A demo of config/dev.env 
  ```
  PORT=3000
  SEND_IN_BLUE_API_KEY=d0ae19dPJ8sdfMsdfbsdfgsdafApdzwKYvj
  MONGOD_URL=mongodb://127.0.0.1:27017/demo
  JWT_SECRET=mysecretkey
  ```
- Finally run `npm run dev` to run the development server 

# API Documentation
---

- `/user`
    - Method: `POST`
    - Type: Public
    - Action: Create a user account and send the account with access token
    - Body: :point_down:
        ```json
        {
            "name":"demon",
            "email":"demo@gmial.com",
            "age":"89",
            "password": "demo123345689"
        }
        ```



