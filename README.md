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
- `MySQL 5.5.57` (or higher)
- `Node 8.6.0` (latest)

To run the **e2e test** you're also going to need:
- `Google-chrome 61.x` (or higher)
- `Java SE Development Kit 8`

## Installation

Linux & OS X:

1. `git clone https://github.com/AGontcharov/Qlik-project.git`

2. `CD Qlik-Project`

3. `Sudo npm install`

4. `mysql -u root -p < init.sql`

5. `npm run wd-update`


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

1. `npm start`

2. `Open Chrome (or your favorite browser)`

3. `Go to: localhost:3000`

## REST API

### Get API

URL: `api/`

Method: GET

URL Params: N/A

Data Params: N/A

Success Response Codes: 200

Success Response Content:
```sh
{
  "version": "1.0",
  "documentation": "https://github.com/AGontcharov/Qlik-Project"
}
```

Error Response Codes: N/A

### Create User

URL: `api/users`

Method: POST

URL Params: N/A

Data Params: 
```sh
{
  "username": "Qlik"
}
```

Success Response Codes: 201

Success Response Content:
`"User Created"`

Error Resonse Codes:
- 400 `"Missing username"`
- 409 `"Username already exists"`
- 500 `"Server error"`

### Authenticate User

URL: `api/users/login`

Method: POST

URL Params: N/A

Data Params:
```sh
{
  "username": "Qlik"
}
```

Success Response Codes: 200

Success Response Content:
`'Authenticated'`

Error Response Codes:
- 400 `"Missing username"`
- 404 `"User does not exist"`
- 500 `"Server error"`

### Get All Users

Method: GET

URL: `api/users`

URL Params: N/A

Data Params: N/A

Success Response Codes: 200

Success Response Content: `Array of usernames`

Error Response Codes: 404 `"No users are registered in the system"`

### Post Message

Method: POST

URL: `api/messages`

URL Params: N/A

Data Params:
```sh
{
  "username": "Qlik",
  "subject": "Example",
  "content": "This is the message body!"
}
```

Success Response Codes: 201

Success Response Content: `"Message Submitted"`

Error Response Codes:
- 400 `"Missing subject"`
- 400 `"Missing content"`
- 500 `"Server error"`

### Get All Messages

Method: GET

URL: `api/messages`

URL Params: N/A

Data Params: N/A

Success Response Codes: 200

Success Response Content: `Array of messages`

Error Response Codes:
- 404 `"Messages not found"`
- 500 `"Server error"`

### Get Message

Method: GET

URL: `api/messages/:messageID`

URL Params: messageID must be a positive number!

Data Params: N/A

Success Response Codes: 200

Success Response Content: `A Message Array`

Error response Codes:
- 404 `"Message not found"`
- 500 `"Server error"`

### Check Palindrome

Method: GET

URL: `api/messages/:messageID/palindrome`

URL Params: messageID must be a positive number!

Data Params: N/A

Success Response Codes: 200

Success Response Content: `True`

Error Response Codes: 200 `False`

### Delete Message

Method: DELETE

URL: `api/messages/:messageID`

URL Params: messageID must be a positive number

Data Params: N/A

Success Response Codes: 204

Success Response Content: `"Message deleted"`

Error Response Codes: 500 `"Server error"`

## Testing

Linux & OS X:

### Unit tests

Jasmine is used to run the unit tests through Karma and can be configured inside **karma.conf.js**.
A headless broswer, PhantomJS is used and as such may throw a hidden dependency error on Ubuntu:

```
node_modules/phantomjs/lib/phantom/bin/phantomjs: error while loading shared libraries: libfontconfig.so.1: cannot open shared object file: No such file or directory
```

If this happens make sure that **libfontconfig** is installed.
`sudo apt-get install libfontconfig`

1. `npm test`

![alt-text](https://image.ibb.co/crYLyw/Unit.jpg "Unit tests")

### e2e test

1. `npm start`

2. `npm run wd-start`

3. `npm run test-e2e`

![alt-text](https://image.ibb.co/dY0O1G/e2e.jpg "e2e tests")

*This is ran off my VM and not the remote server where it's deployed, as I've yet to figure that out*

## Meta

Alexander Gontcharov – alexander.goncharov@gmail.com

Website - [www.alexgontcharov.com](http://www.alexgontcharov.com)

[https://github.com/AGontcharov/](https://github.com/AGontcharov/)
