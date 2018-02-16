require('dotenv').config()
const express = require('express')
const app = express()

const port = process.env.PORT || 4000

app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API. Manage all the paintings for much win.')
})


app.listen(port || 4000, () => console.log('api is listening on port: ', port || 4000))
