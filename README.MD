# Info

- The API is Developed In NodeJS & ExpressJs Framework<br>
- The Database used is MYSQL <br>
- the ORM framework Used is Prisma ORM <br>

## Features

- MVC Architecture
- Error Handeling
- Modular Code
- Middlewares
- Protected Routes
- Validations
- JWT Authentication
- password Hasing
- Pagination
- Searching
- sorting
- Input Validation

### Security

- helmet
- cors
- xss-clean
- express-rate-limit
- JWT Authentication
- Password Hashing

## MVC Architecture

- Models - prisma folder as model is built by default when we use prisma as ORM
- V - view
- Controllers- contain all the functions of all operations

### Routers

- auth.js
- globaluser.js

#### Register User

- Validate - name, email, password
- No Duplicate email
- Hash Password (with bcryptjs)
- Save User
-
- Send Response

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Prisma Errors Handlers

- Validation Errors
- Duplicate (Email)
- Cast Error

## File Structure

```
└── Instahyre
    ├── Controllers
    │   ├── auth.js
    │   └── users.js
    ├── errors
    │   ├── index.js
    │   ├── bad-request.js
    │   ├── custom-api.js
    │   ├── not-found.js
    │   └── unauthenticated.js
    ├── Middleware
    │   ├── authentication.js
    │   ├── errror-handler.js
    │   └── not-found.js
    ├── Prisma
    │   ├── schema.prisma
    │   ├── migrations
    │   └── not-found.js
    ├── routes
    │   ├── auth.js
    │   └── globaluser.js
    ├── app.js
    ├── .env
    ├── globaluser.json
    ├── user.json
    ├── Instahyre-Assignmen-Presentation.pdf
    ├── README.MD
    ├── package.json
    └── package-lock.json

```

## Info of All File

- controllers
  - auth -> for login and creating user Functions [from this (login) jwt token will be created and sent will be sent ]
  - users -> for all functinality in given in task like Mark as Spam, search ny name, search by phone Number after authentication of a particular user by JWT
- errors
  - index -> To map all the errors at one place
  - bad-request -> for bad request error
  - not-found -> To handle Not Found
  - unauthenticated -> For Unauthenticated request
  - custom-api -> To Hadle Unknown error
- middleware -> To Handle User Authorization at each Request and Handle Errors
- Middleware
  - authentication -> To Handle User Authorization at each Request
  - errror-handler -> Handle Errors
  - not-found.js -> Handle Unknown Route
- Prisma
  - schema.prisma -> Connecting to database and Defining Schemas For Registered User and Global User Database
  - migrations -> For ORM purposes
  - routes
    - auth.js -> to redirect login, register user
    - globaluser.js -> to redirect other functionality on GlobalUser Database
- app.js -> Our Main File to run the API
- .env -> Our Confidentials Secrets should be saved on server only
- globaluser.json -> Data For globaluser databse
- user.json -> Data For user databse
- Instahyre-Assignmen-Presentation.pdf -> PPT of Working API with Full Functionalities
- README.MD -> All Info about API
- package.json -> Manifesto file for our API node modules
- package-lock.json -> Manifesto file for our API node modules

## Schema

- The columns marked with '?' are Optional

- Registered User Data Schema

```
model user {
  id         String       @id @default(uuid())
  name       String
  email      String?      //Optional
  phoneNo    String       @unique
  password   String       @db.VarChar(255)
  globalUser globalUser[]
}
```

- Global User Data Schema

```
model globalUser {
  id          String   @id @default(uuid())
  name        String   @unique
  email       String?                        //Optional
  phoneNo     String
  spam        Boolean? @default(false)       //Optional
  isRegister  Boolean? @default(false)       //Optional
  contact     user?    @relation(fields: [contactList], references: [id])  //   Optional
  contactList String?                         //Optional
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Instructions To run the code

- Please Make sure Node (v18.15.0) and MySQL is installed in Your System <br>
- To install the all the data Dependecries <br>
- Run following Coomands

```bash
npm install
```

#### Database Connection

1. Prisma is already set Up, Just need to Apply these Models in database<br>
2. In .env file <br>

```
    DATABASE_URL="mysql://root:password@localhost:3306/YourDatabaseName?"
```

- Replace password with your password and databse name with your database name.

3. Run Following commands

```bash
npx prisma
npx prisma generate
npx prisma migrate deploy
```

4. After this, Please Check three tables with following names must be created in Your databse

- \_prisma_migrations
- user
- globaluser

5. Check the columns name and Primary key and Foreign Key relations

#### Populate the data

- Import the user.json file (with all columns including id) in your user table using "Table Data Import Wizard" in MySQL Workbench or JSON Import Utility
- In mySQl Workbench Right click on user Table and choose Table Data Import Wizard
  - Browse the user.json file location
  - Tick Use Existing Table
  - Match columns with json Dart Column
  - The data must be populated
    NOTE :- First Import user.json file then globaluser.json
- Run MySQL Query for globaluser

```
SET FOREIGN_KEY_CHECKS = 0
```

- Import global.json file (with all columns including id) in your globaluser table like u did before for user.json
  Not again activate Foreign key relation by running following command for globaluser table

```
SET FOREIGN_KEY_CHECKS = 1
```

The Data in both the table must be poulated

### Start the server

```bash
npm install
```

If You see
"Server is listening on port 5000..." in terminal

- API is ready to run and test

## [ Click Here to See All Functionalities Working ](https://drive.google.com/file/d/1O8sJHdcLApvQ3RTRf9Ne66C2nl2ScvML/view?usp=sharing) <br>

## [My Profile Link ](https://linktr.ee/curiousvishu)
