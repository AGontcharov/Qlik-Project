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

## Testing



Linux & OS X:
```sh
npm test
```

## Meta

Alexander Gontcharov – alexander.goncharov@gmail.com

Website - [www.alexgontcharov.com](http://www.alexgontcharov.com)

[https://github.com/AGontcharov/](https://github.com/AGontcharov/)
