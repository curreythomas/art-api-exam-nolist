# ART API

## Getting Started

### Create a database

* Art API will work with a CouchDB database such as the one provided by roo or by IBM Cloudant.
  In order to create a roo database it is first necessary to obtain an account at the JRS School. A database is created by entering the command:

$ roo db add <database-name>

### Clone your repo

Find or create an folder to install the application. The application with be cloned to a sub-folder called "/art-api-exam-nolist" by running the following command:

$ git clone https://github.com/CATOCHE/art-api-exam-nolist.git

### Install dependencies

Use npm install command to install all dependencies required by the api:

$ npm install

This will install all dependencies defined in the project's package.json file.

### Establish environment variables such as key and secrets to create a database url

Open the project in atom and create a ".env" file. This file will be used to define the local environment parameters such as the port id and the database url, including the database key and password provided by the database management software. These parameters must be defined in the following format:

PORT=port-number // e.g. PORT=4000

COUCHDB_URL=https://'database-key':'database-secret'@'database-service'/'database-name'

Make sure to also create a file named .gitignore that should include a list of files that will not be uploaded to Github. It is very important to include the .env in this file in order to keep the database access information private.
It is also important to include 'node_modules' in this file, since these modules are accessible from NDM and are not required to be stored with the project in Github.

### Load your data.

Sample data is provided in a file called load-data.js that contains 8 documents that will be loaded to the database by calling the script:

$ npm run load

### Start the API

The API can be launched by running the command:

$ npm start

### Make your first `GET` call within the browser.

To verify the APU is running use any web browser and enter the in the URL line:

localhost:<port>

e.g.

localhost:4000

The API should respond with a message such as:

"Welcome to the Art API. Manage all the paintings for much win."

## Basics

Within your readme, include a **Basics** section containing the following sections:

> Hint: https://apidocs.sky.blackbaud.com/docs/basics/

* Base URL - All endpoints within the paintings are located at the following base URL
* Scheme - what scheme does your api support?
* HTTP Verbs - what verbs does your api support? How does each verb relate to each of the routes for your entities, such as paintings?
* Content Types
* Response Status Codes - Include a listing of common successful and error status codes that a developer could encounter with _your API_. For example, what causes a painting not to be found? What causes a resource conflict when updating or adding a painting? What causes a bad request? See the section titled **Response status codes** in SKY API Docs [Basics](https://apidocs.sky.blackbaud.com/docs/basics/)

  For each status code include:

* the status code
* a description of the status code
