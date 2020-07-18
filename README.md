# Discash backend
Kuma Backend is an Discash API. It's built on the Node Js, uses Mysql & Express.
## Instalation
just clone this repo
```
git clone https://github.com/kubil-ismail/discash_backend.git
```
## Usage
Setting your dotenv file
```
APP_URL=
APP_PORT=
APP_KEY=
APP_DEBUG=

APP_EMAIL=
APP_EMAIL_PASS=
APP_EMAIL_SERVICE=

DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
```
run the server
```
nodemon
```
## HTTP response
* 200 ```OK``` - the request was successful.
* 201 ```Create Success``` - the request was successful.
* 400 ```Bad Request``` - You've made an invalid request or to an invalid endpoint.
* 401 ```nauthorized``` - The request has not been applied because it lacks valid authentication credentials for the target resource.
* 404 ```Not Found``` - Kuma Book responded with a 404
* 422 ```Unprocessable Entity``` - Unable to process the contained instructions
## JSON response
```
{
    "status": false,
    "message": "Page not found",
    "result": [],
    "option": []
}
```
* ```status``` - Status response returned
* ```message``` - Appropriate message from the REST API
* ```result``` - Return data from database
* ```options``` - Return optional data Like pagination or etc
# Routes
## Auth routes
* **POST** Register endpoint path: /auth/register
* **POST** Login endpoint path: /auth/login
* **POST** Pin endpoint path: /auth/pin/
* **POST** Activate endpoint path: /auth/activate
* **POST** Forgot endpoint path: /auth/forgot
* **PATCH** Pin endpoint path: /auth/pin
## User routes
* **GET** Profile endpoint path: /user[/{id}]
* **GET** Inbox user endpoint path: /user/inbox/{id}
* **DELETE** Profile endpoint path: /user/{id}
* **PATCH** Profile endpoint path: /user/{id}
* **PATCH** Avatar endpoint path: /user/avatar/{id}
## Transaction routes
* **GET** All transaction endpoint path: /transactions/
* **GET** Top up endpoint path: /topup?payment=[payment method]&userid=[get id my accounts]&price=[total top up money]
* **GET** Transfer money endpoint path: /transfer/money/?payment=[payment method]&userid=[get id my accounts]&price=[total money]&account_number=[number_rek for account destination]&name=[type of transfer]
* **POST** Pay endpoint path: /pay
## History routes
* **GET** User history transaction endpoint path: /transactions/user/{id}
* **GET** User history transfer endpoint path: /transfer/user/{id}
## License
