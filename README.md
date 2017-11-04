# Qlik Audition Project
> A simple RESTful message storing service

Publicly available at: [http://ec2-52-42-73-248.us-west-2.compute.amazonaws.com:3000](http://ec2-52-42-73-248.us-west-2.compute.amazonaws.com:3000)

## Implementation Architecture

- **M**ySQL is used to store records in the database
- **E**xpress is used as middleware stack for API routes
- **A**ngular is used as the JS Client Framework
- **N**ode Is used along with Express for the server

![alt-text](https://image.ibb.co/dTUSTw/Block_Diagram.png "Block Diagram")

## Deployment

To deploy this on **Ubuntu 14.04** (*feel free to try on your own system though*) follow the instructions below!

Install the following **prerequisites**:
- `MySQL 5.5.57` (or higher)
- `Node 8.6.0` (latest)

To run the **e2e test** you're also going to need:
- `Google-chrome 61.x` (or higher)
- `Java SE Development Kit 8`

## Installation

Linux & OS X:

1. `git clone https://github.com/AGontcharov/Qlik-project.git`

2. `cd Qlik-Project`

3. `sudo npm install`

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
```{json}
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
```{json}
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

Success Response Content:
```{json}
[
  {
    "Username":"Alexander"
  },
  {
    "Username":"Brandon"
  },
  {
    "Username":"Chris"
  }
]
```

Error Response Codes: 404 `"No users are registered in the system"`

### Post Message

Method: POST

URL: `api/messages`

URL Params: N/A

Data Params:
```{json}
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

Success Response Content:
```{json}
[
  {
      "ID":1,
      "MessageID":2,
      "Subject":"First Message!",
      "Date":"2017-09-30T23:29:43.000Z",
      "Content":"I got here first!",
      "Username":"Alexander"
  },
  {
      "ID":5,
      "MessageID":27,
      "Subject":"Another Palindrome",
      "Date":"2017-10-02T09:23:04.000Z",
      "Content":"1234554321",
      "Username":"Sergey"
  }
]
```

Error Response Codes:
- 404 `"Messages not found"`
- 500 `"Server error"`

### Get Message

Method: GET

URL: `api/messages/:id`

URL Params: id must be a positive number!

Data Params: N/A

Success Response Codes: 200

Success Response Content: 
```{json}
[
  {
      "ID":1,
      "MessageID":2,
      "Subject":"First Message!",
      "Date":"2017-09-30T23:29:43.000Z",
      "Content":"I got here first!",
      "Username":"Alexander"
  }
]
```

Error response Codes:
- 404 `"Message not found"`
- 500 `"Server error"`

### Delete Message

Method: DELETE

URL: `api/messages/:id`

URL Params: id must be a positive number

Data Params: N/A

Success Response Codes: 204

Success Response Content: `"Message deleted"`

Error Response Codes: 500 `"Server error"`

## Testing

Linux & OS X:

### Unit Tests

Jasmine is used to run the unit tests through Karma and can be configured inside **karma.conf.js**.

1. `npm test`

![alt-text](https://image.ibb.co/crYLyw/Unit.jpg "Unit tests")

### E2E Tests

Protractor is used to run the end-to-end test and can be configured inside **protractor.conf.js**.

1. `npm start`

2. `npm run wd-start`

3. `npm run test-e2e`

![alt-text](https://image.ibb.co/dY0O1G/e2e.jpg "e2e tests")

## Meta

Alexander Gontcharov – alexander.goncharov@gmail.com

Website - [www.alexgontcharov.com](http://www.alexgontcharov.com)

[https://github.com/AGontcharov/](https://github.com/AGontcharov/)
