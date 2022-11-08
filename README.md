# Technical Assessment - Quang(Alex) Huynh The (Viet Nam)

## Local Development

You can easy setup docker image for the database (MongoDB), installing the dependencies:

```bash
bash setup.sh
```
And then, you can connect mongodb in http://localhost:27017, user name 'root' and password is 'root'.

Finaly, your develop environment is created.

You can start api with followed command.

```bash
npm run start
```

## API Document
```bash
Go to http://<host>:<port>/docs to open Swagger Document.
Default is http://localhost:3000/docs 
```

## Design
### 1. Requirement
Write a restful APIs using node.js & MongoDB which can compile & running in localhost docker which fulfills the below requirements:
- Create new customer(s)
- Update customer details
- Retrieve customer(s)
- Delete customer(s)

### 2. Architect Design
I built a monolith architect, but applying Domain Driven Design and Dependency Injection, it can be splited to microservices easily by spliting module. 

## Tech Stack

- [Nx](https://nx.dev)
- [NestJS](https://nestjs.com)
- [MongoDB](https://www.mongodb.com/)

## Stay in touch

- Author - [Alex Huynh](https://github.com/htquangg)
- Linkedin - [Alex Huynh](https://www.linkedin.com/in/food-delivery/)
