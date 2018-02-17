require("dotenv").config()
const express = require("express")
const app = express()

const port = process.env.PORT || 4000
const HTTPError = require("node-http-error")
const bodyParser = require("body-parser")
const { addPainting } = require("./dal")
const { prop } = require("ramda")

app.use(bodyParser.json())

///////////////////////////////////////////////////
//         Respond to localhost:4000             //
///////////////////////////////////////////////////
app.get("/", function(req, res, next) {
  res.send("Welcome to the Art API. Manage all the paintings for much win.")
})

///////////////////////////////////////////////////
//  CREATE: use POST to add a single painting    //
///////////////////////////////////////////////////
app.post("/paintings", function(req, res, next) {
  addPainting(prop("body", req))
    .then(addedPaintingResult => res.status(201).send(addedPaintingResult))
    .catch(err => next(new HTTPError(err.status, err.message, err)))
})

///////////////////////////////////////////////////
//         Error handler                         //
///////////////////////////////////////////////////
app.use((err, req, res, next) => {
  console.log("api.js Error: ", err)
  res.status(err.status || 500).send(err.message)
})

///////////////////////////////////////////////////
//         Listen to port                         //
///////////////////////////////////////////////////
app.listen(port || 4000, () =>
  console.log("api is listening on port: ", port || 4000)
)
