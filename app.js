require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const {
  prop,
  path,
  isEmpty,
  not,
  join,
  compose,
  omit,
  merge,
  __
} = require('ramda')
const nodeHTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting
} = require('./dal.js')
const checkRequiredFields = require('./lib/check-required-fields.js')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API. Manage all the paintings for much win.')
})

app.post('/paintings', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }
  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'painting' }),
    prop('body')
  )(req)

  console.log('body: ', body)

  const checkPainting = checkRequiredFields(
    ['name', 'movement', 'artist', 'yearCreated', 'museum'],
    body
  )

  console.log('checkPainting: ', checkPainting)

  if (not(isEmpty(checkPainting))) {
    return next(
      new nodeHTTPError(
        400,
        `Missing required fields: ${join(' ', checkPainting)}`
      )
    )
  }

  console.log('Is checkPainting full? ', not(isEmpty(checkPainting)))
  console.log('Is checkPainting empty', isEmpty(checkPainting))
  console.log('body before addPainting: ', body)

  addPainting(body)
    .then(result => res.status(201).send(result))
    .catch(err => next(new nodeHTTPError(err.status, err.message)))

  console.log('body after addPainting: ', body)
})

app.get('/paintings/:id', (req, res, next) => {
  getPainting(path(['params', 'id'], req))
    .then(painting => res.status(200).send(painting))
    .catch(err =>
      next(
        new nodeHTTPError(prop('status', err), prop('message', status), {
          description:
            'Were sorry, there seems to be an issue getting that painting.'
        })
      )
    )
})

app.put('/paintings/:id', (req, res, next) => {
  if (isEmpty(prop('body'), req)) {
    return next(
      new nodeHTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }
  const checkPainting = checkRequiredFields(
    ['_id', '_rev', 'name', 'movement', 'artist', 'yearCreated', 'museum'],
    prop('body', req)
  )
  if (not(isEmpty(checkPainting))) {
    return next(
      new nodeHTTPError(
        401,
        `Missing required fields: ${join(' ', checkPainting)}`
      )
    )
  }

  updatePainting(prop('body', req))
    .then(result => res.status(200).send(result))
    .catch(err => next(new nodeHTTPError(err.status, err.message)))
})

app.delete('/paintings/:id', (req, res, next) =>
  deletePainting(path(['params', 'id'], req))
    .then(deletedPainting => res.status(200).send(deletedPainting))
    .catch(err =>
      next(new nodeHTTPError(prop('status', err), prop('message', err)))
    )
)

app.use((err, req, res, next) => {
  console.log('error', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('Art API is up on Port: ', port))
