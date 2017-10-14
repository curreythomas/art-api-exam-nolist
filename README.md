# Art API

Manages a list of paintings and their artists.


## Getting Started

To contribute to this project, you will need to
1. Clone the repo (https://github.com/curreythomas/art-api-exam-nolist.git)
2. Install dependencies (body-parser, dotenv, express, node-http-error, pouchdb, ramda)
3. Create environment variables (.env)
4. Load data
5. Start the API


```
$ git clone https://github.com/curreythomas/art-api-exam-nolist.git
$ cd art-api-exam-nolist
$ npm install
```

### Environment Variables
You'll need to create a local **.env** file to store your application's secret.  Follow these steps to generate and store the secrets.

0. Create a `COUCHDB_URL` environment variable:  Using Cloudant for example or a local instance of CouchDB, create an API key for the database.  Store the key and password within your **.env** file.  Use the key and password to create an environment variable named `COUCHDB_URL` using this pattern `COUCHDB_URL=https://<key>:<password>@<your base url>/`.

  **Example**

  ```
  COUCHDB_URL=https://sdfrtrerdfsxdnorth:187254aff7762f28afxu92d137c1899c14f7c999@jeffjohnson.cloudant.com/
  ```

0. Create a `COUCHDB_NAME` environment variable.  The name of the database.

  **Example**

  ```
  COUCHDB_NAME=<yourname>Art
  ```

0.  Create a `PORT` environment variable used by the client application to connect and communicate with your api.

  **Example**

  ```
  PORT=4000
  ```

### Starting the API

  Run the following command to start the api on localhost:4000.

  ```
  $ npm start
  ```
