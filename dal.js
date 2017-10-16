require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)
const { remove, replace, prop } = require('ramda')
const pkGen = require('./lib/pk-builder.js')

const addPainting = painting => {
  console.log('painting before adding id', painting)
  painting._id = pkGen('painting', prop('name', painting))
  console.log('after', painting)
  return db.put(painting)
}

const getPainting = id => db.get(id)
const updatePainting = doc => db.put(doc)
const deletePainting = id => db.get(id).then(doc => db.remove(doc))

module.exports = {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting
}
