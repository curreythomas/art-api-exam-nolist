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

`"start": "node app.js"`

### Environment Variables
You'll need to create a local **.env** file to store your application's secret.  Follow these steps to generate and store the secrets.

1. Create a `COUCHDB_URL` environment variable:  Using Cloudant for example or a local instance of CouchDB, create an API key for the database.  Store the key and password within  your **.env** file.  Use the key and password to create an environment variable named `COUCHDB_URL` using this pattern:

`COUCHDB_URL=https://<key>:<password>@<your base url>/`

  **Example**

  ```
  COUCHDB_URL=https://sdfrtrerdfsxdnorth:187254aff7762f28afxu92d137c1899c14f7c999@jeffjohnson.cloudant.com/
  ```

2. Create a `COUCHDB_NAME` environment variable.  The name of the database.

  **Example**

  ```
  COUCHDB_NAME=<yourname>Art
  ```

3.  Create a `PORT` environment variable used by the client application to connect and communicate with your API.

  **Example**

  ```
  PORT=4000
  ```

### Load Your Data

Create another command in the script section of your **package.json** file that will run your **load.js** file and load your data into the database. If this is already there please disregard and just run `npm load` in the terminal.

**Example**
`"load": "node load.js"`




### Starting the API and making your first `GET` call

  Run the following command to start the API on localhost:4000.

  ```
  $ npm start
  ```

  Open your browser and enter localhost:4000/paintings/painting_starry_night

  This should return a JSON object that looks like this:

  ```
  {
"_id": "painting_starry_night",
"_rev": "5-e65f42384d05d14110089a6be3c54e48",
"name": "The Starry Night",
"movement": "post-impressionism",
"artist": "Vincent van Gogh",
"yearCreated": 1889,
"museum": {
"name": "Museum of Modern Art",
"location": "New York"
},
"type": "painting"
}
```

## Basics

### Base URL

All endpoints within the ART API are located at the following base URL:

```
http://localhost:4000
```

### Scheme

This is a highly regarded API with confidential data on famous paintings and authors, yet we will be doing all communication through HTTP.

### HTTP Verbs

|Verb    | Description                                 |
|--------|:--------------------------------------------|
|GET     |Used to retrieve resources.                  |
|POST    |Used to create resources.                    |
|PUT     |Used to update the properties of a resource. |
|DELETE  |Used to delete resources.                    |


### Content Types

All endpoints within the ART API accept and return data formatted as JSON. When providing content in the body of a request the `Content-Type` request header must be `application/json`.


### Response Status Codes

|Status Code|Description|
|-----------|-----------|
|200 OK     |The request was successful and you can see this result in the response message body.|

**Sample**
```
{
  "ok":true,
  "id":"painting_bal_du_moulin_de_la_galette",
  "rev": "3-fdd7fcbc62477372240862772d91c88f"
}
```


|Status Code|Description|
|-----------|-----------|
|201 CREATED|The request has been completed and resulted in a new resource being created. You should see your new id created and also find that as the new request URI.|



**Sample**

```
{
  "ok": true,
  "id": "painting_persistence_of_memory",
  "rev": "1-c617189487fbe325d01cb7fc74acf45b"
}
```

|Status Code|Description|
|-----------|-----------|
|400 BAD REQUEST |The request was invalid and the server could not understand. Make sure that you have provided a request body in the proper format. Also check that your resource path is correct for the type of HTTP Request you are making.|

**Sample**
 - Bad request because this is missing the request body.

```
{

}
```




|Status Code|Description|
|-----------|-----------|
|401 UNAUTHORIZED |The request was not applied because it lacks all the necessary data to perform the http request. Check to make sure all the required fields are provided.|

**Sample**
- This request is missing the yearCreated.

```
{
  "name": "Bal du moulin de la Galette",
  "type": "painting",
  "movement": "impressionism",
  "artist": "Pierre-Auguste Renoires",
  "museum": {name: "Musée d’Orsay", location: "Paris"}
}
```

|Status Code|Description|
|-----------|-----------|
|409 CONFLICT |The request could not be completed due to a conflict with the current state of the target resource. Check the database to make sure you have not already created that resource.|

**Sample**

```
/PUT Request
{
    "name": "The Starry Night",
    "movement": "post-impressionism",
    "artist": "Vincent van Gogh",
    "yearCreated": 1889,
    "museum": {
        "name": "Museum of Modern Art",
        "location": "New York"
    }
}


Return statement
{
  "ok": true,
  "id": "painting_starry_night",
  "rev": "1-c617189487fbe325d01cb7fc74acf45b"
}


Second /PUT Request
{
    "name": "The Starry Night",
    "movement": "post-impressionism",
    "artist": "Vincent van Gogh",
    "yearCreated": 1889,
    "museum": {
        "name": "Museum of Modern Art",
        "location": "New York"
    }
}


409 Response
{
    "name": "HTTPError",
    "statusCode": 409,
    "status": 409,
    "message": "Document update conflict."
}
```

|Status Code|Description|
|-----------|-----------|
|500 INTERNAL SERVER ERROR |This is an us problem. Our server encountered an unexpected error that prevented it from fulfilling the request.|


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

--------------------------------------------------------------------------------
### Artists  

#### Create a Artist:
`POST  /artists`

Creates a painting.

**Sample Request**

  ```
  POST /artists
  ```

  **Sample Request Body JSON Data**

  ```
  {
  	"name": "Claude Monet",
  	"birthdate": "10-07-1840",
  	"hometown": "Giverny, France"
  }
  ```

  **Sample Response**

  ```
  {
      "ok": true,
      "id": "artist_claude_monet",
      "rev": "1-8a32eb75a2c42afe42170b73dc9172e9"
  }
  ```

#### Get a Artist:
`GET  /artists/{id}`  

  Retrieves a specific artist as identified by the `:id` path parameter.

  **Sample Request**

  ```
  GET /artists/artist_claude_monet
  ```

  **Sample Response**

  ```
  {
    "_id": "artist_claude_monet",
    "_rev": "1-8a32eb75a2c42afe42170b73dc9172e9",
    "name": "Claude Monet",
    "birthdate": "10-07-1840",
    "hometown": "Giverny, France",
    "type": "artist"
}
  ```

  #### Update a Artist:
  `PUT /artists/{id}`

  Updates a specific artist as identified by the `:id` path parameter.  The request body must contain a JSON object that represents the artist being updated.  The request body must include the `_id`, `_rev`, `name`, `birthdate`, and `hometown` fields.  Not providing the most recent `_rev` value will cause an `409 - conflict` error to occur.

  **Sample Request**

  ```
  PUT /artists/artist_claude_monet
  ```

  **Sample Request Body JSON Data**

  ```
  {
      "_id": "artist_claude_monet",
      "_rev": "1-8a32eb75a2c42afe42170b73dc9172e9",
      "name": "Claude Monet",
      "birthdate": "10-08-1840",
      "hometown": "Giverny, France",
      "type": "artist"
  }
  ```

  **200 Sample Response**

  ```
  {
      "ok": true,
      "id": "artist_claude_monet",
      "rev": "2-ca377a21e0ddd50c1db42ff2238cb3e6"
  }
  ```

  #### Delete a Artist:
  `DELETE /artists/{id}`

  Deletes a specific artist as identified by the `:id` path parameter.

  **200 Sample Request**

  ```
  DELETE /artists/artist_claude_monet
  ```

  **Sample Response**

  ```
  {
      "ok": true,
      "id": "artist_claude_monet",
      "rev": "3-02eec4e3e1b2ac8e427b700a377aae04"
  }
  ```
