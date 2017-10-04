# Qlik Audition Project
> A simple RESTful backend service

## Architecture

- MySQL 5.5.46
- Express 4.15.3
- Angular 1.6.5
- Node 8.6.0

Block diagram coming soon...

## Deployment

Instructions coming soon...

## Installation

Linux & OS X:

```sh
git clone https://github.com/AGontcharov/Qlik-project.git
cd Qlik-Project/
sudo npm install
mysql -u root -p < init.sql
npm run wd-update
```
Next provide a **config.json** file in the root directory with the necessary crendentials:

```sh
{
  "mysql": {
    "user": "",
    "password": "",
    "database": "Qlik"
  },
}
```

Windows:

```sh
Not yet available
```

## Running

Linux & OS X:

```sh
npm start
Open Chrome (or your favorite browser)
Go to: localhost:3000
```

## REST API Documentation

### POST api/users
__Parameters__
```sh
{
  "username": "Qlik"
}
```
__Return__
- HTTP 201 ('User created')
- HTTP 400 ('Missing username')
- HTTP 409 ('Username already exists')
- HTTP 500 ('Server error')

### POST api/users/login

__parameters__
```sh
{
  "username": "Qlik"
}
```
__Return__
- HTTP 201 ('Authenticated')
- HTTP 404 ('User does not exist')
- HTTP 500 ('Server error')

### GET api/users

__Return__
- HTTP 200 An array of usernames
- HTTP 404 ('No users are registered in the system')

### POST api/messages

__Parameters__
```sh
{
  "username": "Qlik",
  "Subject": "Example"
  "Content": "This is the message body!"
}
```

__Return__
- HTTP 201 ('Message submitted')
- HTTP 400 ('Missing subject')
- HTTP 400 ('Missing content')
- HTTP 500 ('Server error')

### GET api/messages

__Return__
- HTTP 200 An array of messages
- HTTP 404 ('Messages not found')
- HTTP 500 ('Server error')

### GET api/messages/:messageID

__Return__
- HTTP 200 A single array of the message
- HTTP 404 ('Message not found')
- HTTP 500 ('Server error')

### GET api/messages/:messageID/palindrome

__Return__
- HTTP 200 true
- HTTP 200 false

### DELETE api/messages/:messageID

__Return__
- HTTP 204 ('Message deleted')
- HTTP 500 ('Server error')

## Testing

Linux & OS X:
```sh
npm test
```

## Meta

Alexander Gontcharov – alexander.goncharov@gmail.com

Website - [www.alexgontcharov.com](http://www.alexgontcharov.com)

[https://github.com/AGontcharov/](https://github.com/AGontcharov/)
