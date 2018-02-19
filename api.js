require("dotenv").config()
const express = require("express")
const app = express()

const port = process.env.PORT || 4000
const HTTPError = require("node-http-error")
const bodyParser = require("body-parser")
const { addDoc, getDoc, updDoc, delDoc } = require("./dal")
const { prop, pluck, isEmpty } = require("ramda")
const { checkReqFields } = require("./lib/check-required-fields")

///////////////////////////////////////////////////////////////////////////////
//  Ensure request body contains JSON object                                 //
///////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.json())

///////////////////////////////////////////////////////////////////////////////
//  Respond to empty request on localhost:4000                               //
///////////////////////////////////////////////////////////////////////////////
app.get("/", function(req, res, next) {
  res.send("Welcome to the Art API. Manage all the paintings for much win.")
})

///////////////////////////////////////////////////////////////////////////////
//  PAINTING's CRUD                                                    //
///////////////////////////////////////////////////////////////////////////////
const paintingFields = [
  "_id",
  "name",
  "movement",
  "artist",
  "yearCreated",
  "museum",
  "type"
]

///////////////////////////////////////////////////////////////////////////////
//  CREATE: use POST to add a single painting                                //
///////////////////////////////////////////////////////////////////////////////
app.post("/paintings", (req, res, next) => {
  //   addDoc(prop("body", req))
  //     .then(addedPaintingResult => res.status(201).send(addedPaintingResult))
  //     .catch(err => next(new HTTPError(err.status, err.message, err)))
  // })
  if (isEmpty(checkReqFields("POST", paintingFields, req.body))) {
    addDoc(req.body)
      .then(painting => res.status(201).send(painting))
      .catch(err => next(new HTTPError(err.status, err.message, err)))
  } else {
    console.log(
      "missing fields from POST: ",
      checkReqFields("POST", paintingFields, req.body)
    )
    next(
      new HTTPError(
        400,
        "Bad Request: Missing field in painting's JSON object."
      )
    )
  }
})
///////////////////////////////////////////////////////////////////////////////
//  RETRIEVE: use GET to retrieve a single painting by its id                //
///////////////////////////////////////////////////////////////////////////////
app.get("/paintings/:id", (req, res, next) =>
  getDoc(req.params.id)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

///////////////////////////////////////////////////////////////////////////////
//  UPDATE a Painting:                                                       //
// The request body must contain a JSON object that represents the painting  //
// being updated. The request body must include the _id, _rev, name,         //
// movement, artist, yearCreated, museum, and type fields. Not providing the //
// most recent _rev value will cause an 409 - conflict error to occur.       //
///////////////////////////////////////////////////////////////////////////////
app.put("/paintings/:id", (req, res, next) => {
  if (isEmpty(checkReqFields("PUT", paintingFields, req.body))) {
    updDoc(req.body)
      .then(painting => res.send(painting))
      .catch(err => next(new HTTPError(err.status, err.message, err)))
  } else {
    next(
      new HTTPError(
        400,
        "Bad Request: Missing field in painting's JSON object."
      )
    )
  }
})

///////////////////////////////////////////////////////////////////////////////
//  DELETE a single painting by its id                                       //
///////////////////////////////////////////////////////////////////////////////
app.delete("/paintings/:id", (req, res, next) =>
  delDoc(req.params.id)
    .then(painting => res.send(painting))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

///////////////////////////////////////////////////////////////////////////////
//  ARTIST'S CRUD                                                    //
///////////////////////////////////////////////////////////////////////////////
const artistFields = [
  "_id",
  "name",
  "type",
  "dateBorn",
  "placeBorn",
  "dateDied",
  "placeDied",
  "movements"
]
///////////////////////////////////////////////////////////////////////////////
//  CREATE: use POST to add a single artist                                //
///////////////////////////////////////////////////////////////////////////////
app.post("/artists", (req, res, next) => {
  //   addDoc(prop("body", req))
  //     .then(artist => res.status(201).send(artist))
  //     .catch(err => next(new HTTPError(err.status, err.message, err)))
  // })
  if (isEmpty(checkReqFields("POST", artistFields, req.body))) {
    addDoc(req.body)
      .then(artist => res.status(201).send(artist))
      .catch(err => next(new HTTPError(err.status, err.message, err)))
  } else {
    next(
      new HTTPError(400, "Bad Request: Missing field in artist's JSON object.")
    )
  }
})

///////////////////////////////////////////////////////////////////////////////
//  RETRIEVE: use GET to retrieve a single artist by its id                //
///////////////////////////////////////////////////////////////////////////////
app.get("/artists/:id", (req, res, next) =>
  getDoc(req.params.id)
    .then(artist => res.send(artist))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)

///////////////////////////////////////////////////////////////////////////////
//  UPDATE an artist:                                                       //
// The request body must contain a JSON object that represents the painting  //
// being updated. The request body must include the _id, _rev, name,         //
// type, dateBorn, placeBorn, dateDied, placeDied and movements fields. Not  //
// providing the most recent _rev value will cause an 409 - conflict error   //
// to occur.                                                                 //
///////////////////////////////////////////////////////////////////////////////

app.put("/artists/:id", (req, res, next) => {
  if (isEmpty(checkReqFields("PUT", artistFields, req.body))) {
    updDoc(req.body)
      .then(artist => res.send(artist))
      .catch(err => next(new HTTPError(err.status, err.message, err)))
  } else {
    next(
      new HTTPError(400, "Bad Request: Missing field in artist's JSON object.")
    )
  }
})

///////////////////////////////////////////////////////////////////////////////
//  DELETE a single artist by its id                                       //
///////////////////////////////////////////////////////////////////////////////
app.delete("/artists/:id", (req, res, next) =>
  delDoc(req.params.id)
    .then(artist => res.send(artist))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
)
///////////////////////////////////////////////////////////////////////////////
//   Error handler                                                           //
///////////////////////////////////////////////////////////////////////////////
app.use((err, req, res, next) => {
  console.log("api.js Error: ", err)
  res.status(err.status || 500).send(err.message)
})

///////////////////////////////////////////////////////////////////////////////
//   Listen to port (use 4000 by default)                                    //
///////////////////////////////////////////////////////////////////////////////
app.listen(port || 4000, () =>
  console.log("ART API is listening on port: ", port || 4000)
)
