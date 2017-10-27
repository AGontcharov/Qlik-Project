# Qlik Audition Project
> A simple RESTful backend service

Publicly available at: [http://ec2-52-42-73-248.us-west-2.compute.amazonaws.com:3000](http://ec2-52-42-73-248.us-west-2.compute.amazonaws.com:3000)

## Architecture

- MySQL 5.5.57
- Express 4.15.3
- Angular 1.6.5
- Node 8.6.0

![alt-text](https://image.ibb.co/dTUSTw/Block_Diagram.png "Block Diagram")

## Deployment

Unforunately due to linking problems between the application container and the MySQL container I was unable to deploy it using Docker! However to deploy this on **Ubuntu 14.04** (*feel free to try on your own system though*) follow the instructions below!

Install the following **prerequisites**:
- MySQL 5.5.57 (or higher)
- Node 8.6.0 (latest)

To run the **e2e test** you're also going to need:
- Google-chrome 61.x (or higher)
- Java SE Development Kit 8

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
  }
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
Go to: localhost:7000
```

## REST API Documentation

### GET api/

__Return__
```sh
{
  "version": "1.0",
  "documentation": "https://github.com/AGontcharov/Qlik-Project"
}
```

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
- HTTP 400 ('Missing username')
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
  "subject": "Example",
  "content": "This is the message body!"
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

__Parameter__
- messageID must be a positive number! Otherwise It won't match the route!

__Return__
- HTTP 200 A single array of the message
- HTTP 404 ('Message not found')
- HTTP 500 ('Server error')

### GET api/messages/:messageID/palindrome

__Parameter__
- messageID must be a positive number! Otherwise It won't match the route!

__Return__
- HTTP 200 true
- HTTP 200 false

### DELETE api/messages/:messageID

__Parameter__
- messageID must be a positive number! Otherwise It won't match the route!

__Return__
- HTTP 204 ('Message deleted')
- HTTP 500 ('Server error')

## Testing

Linux & OS X:

### Unit tests

Jasmine is used to run the unit tests through Karma and can be configured inside **karma.conf.js**.
A headless broswer, PhantomJS is used and as such may throw a hidden dependency error on Ubuntu:

```
node_modules/phantomjs/lib/phantom/bin/phantomjs: error while loading shared libraries: libfontconfig.so.1: cannot open shared object file: No such file or directory
```

If this happens make sure that **libfontconfig** is installed.
```sh
sudo apt-get install libfontconfig
```

#### To run

```sh
npm test
```

![alt-text](https://image.ibb.co/crYLyw/Unit.jpg "Unit tests")


### e2e test

```sh
npm start
npm run wd-start
npm run test-e2e
```

![alt-text](https://image.ibb.co/dY0O1G/e2e.jpg "e2e tests")

*This is ran off my VM and not the remote server where it's deployed, as I've yet to figure that out*

## Meta

Alexander Gontcharov – alexander.goncharov@gmail.com

Website - [www.alexgontcharov.com](http://www.alexgontcharov.com)

[https://github.com/AGontcharov/](https://github.com/AGontcharov/)
