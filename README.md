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

### Checking Your Dependencies

Open the package.json file and make sure your dependencies were installed. (body-parser, dotenv, express, node-http-error, pouchdb, ramda)

Next, in the "script" section create a command to start your app on localhost:4000. This will allow you to type `$ npm start` to run your app.   

**Example**

"start": "node app.js"

### Environment Variables
You'll need to create a local **.env** file to store your application's secret.  Follow these steps to generate and store the secrets.

0. Create a `COUCHDB_URL` environment variable:  Using Cloudant for example or a local instance of CouchDB, create an API key for the database.  Store the key and password within your **.env** file.  Use the key and password to create an environment variable named `COUCHDB_URL` using this pattern:
`COUCHDB_URL=https://<key>:<password>@<your base url>/`.

  **Example**

  ```
  COUCHDB_URL=https://sdfrtrerdfsxdnorth:187254aff7762f28afxu92d137c1899c14f7c999@jeffjohnson.cloudant.com/
  ```

0. Create a `COUCHDB_NAME` environment variable.  The name of the database.

  **Example**

  ```
  COUCHDB_NAME=<yourname>Art
  ```

0.  Create a `PORT` environment variable used by the client application to connect and communicate with your API.

  **Example**

  ```
  PORT=4000
  ```

### Starting the API

  Run the following command to start the API on localhost:4000.

  ```
  $ npm start
  ```

## Endpoints

### Paintings  

#### Create a Painting:
`POST  /paintings`

Creates a painting.

**Sample Request**

  ```
  POST /paintings
  ```

  **Sample Request Body JSON Data**

  ```
  {
    "name": "The Persistence of Memory",
    "movement": "surrealism",
    "artist": "Salvador Dali",
    "yearCreated": 1931,
    "museum": {name: "Musuem of Modern Art", location: "New York"}
  }
  ```

  **Sample Response**

  ```
  {
    "ok": true,
    "id": "painting_persistence_of_memory",
    "rev": "1-c617189487fbe325d01cb7fc74acf45b"
  }
  ```

#### Get a Painting:
`GET  /paintings/{id}`  

  Retrieves a specific painting as identified by the `:id` path parameter.

  **Sample Request**

  ```
  GET /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Response**

  ```
  {
    "_id": "painting_bal_du_moulin_de_la_galette",
    "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
    "name": "Bal du moulin de la Galette",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Pierre-Auguste Renoires",
    "yearCreated": 1876,
    "museum": {name: "Musée d’Orsay", location: "Paris"}
  }
  ```

  #### Update a Painting:
  `PUT /paintings/{id}`

  Updates a specific painting as identified by the `:id` path parameter.  The request body must contain a JSON object that represents the painting being updated.  The request body must include the `_id`, `_rev`, `name`, `movement`, `artist`, `yearCreated`, and `museum` fields.  Not providing the most recent `_rev` value will cause an `409 - conflict` error to occur.

  **Sample Request**

  ```
  PUT /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Request Body JSON Data**

  ```
  {
    "_id": "painting_bal_du_moulin_de_la_galette",
    "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
    "name": "Bal du moulin de la Galette",
    "type": "painting",
    "movement": "impressionism",
    "artist": "Pierre-Auguste Renoires",
    "yearCreated": 1877,
    "museum": {name: "Musée d’Orsay", location: "Paris"}
  }
  ```

  **200 Sample Response**

  ```
  {
    "ok": true,
    "id": "painting_bal_du_moulin_de_la_galette",
    "rev": "2-7e9b8cac710e70bfe0bef2de7bb3cfdb"
  }
  ```

  #### Delete a Painting:
  `DELETE /paintings/{id}`

  Deletes a specific painting as identified by the `:id` path parameter.

  **200 Sample Request**

  ```
  DELETE /paintings/painting_bal_du_moulin_de_la_galette
  ```

  **Sample Response**

  ```
  {
      "ok": true,
      "id": "painting_bal_du_moulin_de_la_galette",
      "rev": "3-fdd7fcbc62477372240862772d91c88f"
  }
  ```
