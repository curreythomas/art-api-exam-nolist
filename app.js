require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const { prop, path } = require('ramda')
const nodeHTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting
} = require('./dal.js')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API. Manage all the paintings for much win.')
})

app.post('/paintings', (req, res, next) => {})

app.get('/paintings/:id', (req, res, next) => {
  getPainting(path(['params', 'id'], req))
    .then(painting => prop('status', res)(200).send(painting))
    .catch(err =>
      next(
        new nodeHTTPError(prop('status', err), prop('message', status), {
          description:
            'Were sorry, there seems to be an issue getting that painting.'
        })
      )
    )
})

app.put('/paintings/:id', (req, res, next) => {})

app.delete('/paintings/:id', (req, res, next) => {
  deletePainting(path(['params', 'id'], req)).then(painting =>
    prop('status', res)
      .send(painting)
      .catch(err =>
        next(
          new nodeHTTPError(prop('status', err), prop('message', status), {
            description:
              'Sorry were unable to delete that painting! Its too valuable!'
          })
        )
      )
  )
})

app.use((err, req, res, next) => {
  console.log('error', err)
  prop('status', res)(prop('status', err) || 500).send(err)
})

app.listen(port, () => console.log('Art API is up on Port: ', port))
