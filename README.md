# NG-NODE App
> It's a application with MEAN Stack that means MongoDB, ExpressJs, Angular, and NodeJs. In case, it just a demostration.

# Frameworks/Library
- MongoDB v1.17.0
- Angular v7.2.4
- Angular CLI v7.2.4
- Angular Material v7.3.3
- Angular CDK v7.3.3
- Angular Flex Layout v7.0.0-beta.23
- ExpressJs v4.16.4
- Mongoose v5.4.18
- Nodemon v1.18.10
- PromiseJs v8.0.2
- BodyParser v1.18.3

# WebApp Architecture & System Design
> I decided use split the Web Application to server & client as 2 different server that means it's might locate in a server (i.e. Cloud Server or your local computer) but it's start with different service. For example, in expertation I'll deploy the application to AWS Amazon EC2 Web Server with Window Server OS, so I decided use IIS as my service to start and running the client side server, for backend side it will use the nodejs pattern to run, but in design just imagine the scenario but not the reality case i decided to using for.

# Planning Features
- Angular App
- [ ] StandardServices (Model-Based)
- [ ] Upload Images (cloudinary/Google Photo API)
- [ ] Auth (JWT)
- [ ] HTTP Interception (Header-Authorization)
- [ ] Generate Rules

- Node App
- [x] Connect MongoDB (CRUD)
- [x] Routing (APIs)
- [x] Standard Controller (Model-Based)
- [ ] Generate Report (reportingjs)
- [ ] Auth (JWT)
- [ ] Standard Model Inheritance Classes & Properties
- [ ] Standard User (Login, Change Password, Registration, Forgot Password)
- [ ] Standard Role & Authorization
- [ ] Send Email & Email Queue Service
- [ ] Configuration Settings
