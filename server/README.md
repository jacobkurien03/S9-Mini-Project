# Rest API <!-- omit in toc -->

> A REST API starter

- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Main commands](#main-commands)
    - [Development](#development)
    - [Production](#production)
    - [Lint](#lint)

## Getting started

### Prerequisites

**Node.js** is required to run the application.

Visit [this page](https://nodejs.org/en/download/) for download instructions.

### Installation

Install the required dependencies:

`$ npm install`

### Configuration

**ENV**
Create a new file named .env
copy the contents in envexample file
fill all the information

//Insert the JSON File into the database `users.json` into the users collection

### Main commands

#### Development

Start a local development server with the following command:

`$ npm run dev`

This will:

- Fire up a local web server at `localhost` on port 3000 or `PORT` if defined
- Set the `NODE_ENV` variable to `development`
- Watch for changes in the source files allowing the server to reload
  automatically

#### Production

For production use, you need to install forever globally using:

`$ npm i -g forever`

and then start the server with:

`$ npm run deploy`

to stop the server use:

`$ npm run stop`

to restart the server use:

`$ npm run restart`

to list the running servers use:

`$ forever list`

**NOTE:** the application makes use of the `NODE_ENV` environment variable do
determine its running environment.

#### Lint

Check for linting errors with:

`$ npm run lint`

Automatically fix linting errors with:

`$ npm run lint:fix`

### Routes

`/api/register` : User regisration `{Name,email,username,password}`
`/api/login` : User and Admin Login `{username,password}`

To create a super admin you should create a user and manually go into the database and update role as `superadmin`

**User Controls**
To access these routes

1. Login from `/api/login`
2. Copy the `token` value
3. Pass the token value as header named **Key** = `Authorization` **Value**=`Bearer **tokenValue**`
   `/api/report/reportgenerate` : For creating a new report by user `{description}`

**Admin Controls**
To access these routes

1. Login from `/api/login`
2. Copy the `token` value
3. Pass the token value as header named **Key** = `Authorization` **Value**=`Bearer **tokenValue**`
   `/api/admin/reportlist` : Shows every reports
   `/api/admin/singlereport` : Shows individual reports `{reportID}`(ID should be copied)
   `/api/admin/statusupdate` : Update Status `{status}`
   `/api/admin/deletereport` : Delete existing User `{reportID}`
   `/api/admin/sendmail` : Send Email response to client `{message,reportID}`

**Superadmin Controls**

To access superadmin routes superadmin authentication is needed in the header............User should be an superadmin
To access superadmin routes

1. Login from `/api/login`
2. Copy the `token` value
3. Pass the token value as header named **Key** = `Authorization` **Value**=`Bearer **tokenValue**`
   The above header should be used in the routes defined below
   `/api/superadmin/index` : Show list of users
   `/api/superadmin/show` : Show Individual users `{userID}`(UserID should be copied from the list)
   `/api/superadmin/store` : Add new user `{Name,email,username,password}`
   `/api/superadmin/changepass` : Change user password `{userID, password}`
   `/api/superadmin/delete` : Delete existing User `{userID}`
   `/api/superadmin/newadmin` : Create new admin from existing users `{userID}`(new password will be generated it should be copied)
   `/api/superadmin/deleteadmin` : Delete an existing admin `{userID}`
