# Task-Manager

A simple API server that can be used for creating, reading, updating, and deleting user accounts and user-specific tasks with complete and incomplete status. We also use the MongoDB database to store users data and their tasks.


# Main Feature

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

- Make sure you have properly installed nodejs and npm in your machine
- At the time of creating this project my nodejs & npm version is v16.14.2 & v8.5.0
- Make sure you have a MongoDB database running in your local machine, mine is v5.0.6 
- Now clone the code from github and run `npm install`
- Create a config file in the root directory of this project using `mkdir config`
- Go to the config folder using `cd config` and create dev.env file using `touch dev.env`
- Open dev.env & set four environment variable in that file 
  - `PORT="YOUR_PREFERABLE_PORT"`  *//the prot where your server will start listening*
  - `SEND_IN_BLUE_API_KEY="YOUR_API_KEY"` *//Set your own SendInBlue API key*
  - `MONGOD_URL="YOUR_DATABASE_PORT"` *//Set your local database url where it is listening*
  - `JWT_SECRET="YOUR_PREFERABLE_SECRET_KEY"` *//any secret key you wanna set*
  - A demo of config/dev.env :point_down:
  ```
  PORT=3000
  SEND_IN_BLUE_API_KEY=d0ae19dPJ8sdfMsdfbsdfgsdafApdzwKYvj
  MONGOD_URL=mongodb://127.0.0.1:27017/demo
  JWT_SECRET=mysecretkey
  ```
- Finally run `npm run dev` to run the development server 

# API Documentation
> Below there are mainly two types of api public & private. Pubic apis don't require any access tokens but all private apis require authtoken as a header. 


- `/user`
    - Method : `POST`
    - Type : Public
    - Action : Create a user account and send the account with access token
    - Body : :point_down:
        ```json
        {
            "name":"demon",
            "email":"demo@gmial.com",
            "age":"89",
            "password": "demo123345689"
        }
        ```

- `/user/login`
    - Method : `POST`
    - Type : Public
    - Action : Login a user and send the user object with access token
    - Body : :point_down:
        ```json
        {
            "email":"sdfsd@gmial.com",
            "password":"sdfsdf"
        }
        ```
- `/task`
    - Method : `POST`
    - Type : Private
    - Action : Create a task and send that task
    - Body : :point_down:
        ```json
        {
            "description": "Lunch at 2.00PM",
        }
        ```


- `/user/logout`
    - Method : `POST`
    - Type : Private
    - Action : Logout the user and send nothing 
    - Body : Empty



- `/user/logoutAll`
    - Method : `POST`
    - Type : Private
    - Action : Logout from all device and send nothing
    - Body : Empty
  

- `/user/me/avatar`
    - Method : `POST`
    - Type : Private
    - Action : Update profile picture in logged in user
    - Body : It accept jpg,jpeg,png type and >1mb image



- `/user/me`
    - Method : `GET`
    - Type : Private
    - Action : Send the logged in user data
    - Body : Empty



- `/tasks`
    - Method : `GET`
    - Type : Private
    - Action : Return All created task of a logged in user
    - Body : Empty

- `/task/:id`
    - Method : `GET`
    - Type : Private
    - Action : Return a specific task of the logged in user
    - Body : Empty


- `/user/:id/avatar`
    - Method : `GET`
    - Type : Public
    - Action : Return a profile picture of specific user 
    - Body : Empty


- `/user/me`
    - Method : `PATCH`
    - Type : Private
    - Action : Update the current logged in user information and send the user updated info
    - Body : :point_down:
        ```json
        {
            "name":"demon",
            "email":"demo@gmial.com",
            "age":"89",
            "password": "demo123345689"
        }
        ```

- `/task/:id`
    - Method : `PATCH`
    - Type : Private
    - Action : Update a specific task information and send the updated information
    - Body : :point_down:
        ```json
        {
            "description": "Wake Up at 7.00AM",
           "complete": false,
        }
        ```

- `/user/me`
    - Method : `DELETE`
    - Type : Private
    - Action : Delete the logged in user account  and send the user information
    - Body : Empty

- `/task/:id`
    - Method : `DELETE`
    - Type : Private
    - Action : Delete a specific task and return the task information
    - Body : Empty




- `/user/me/avatar`
    - Method : `DELETE`
    - Type : Private
    - Action : Delete logged in user profile picture
    - Body : Empty
