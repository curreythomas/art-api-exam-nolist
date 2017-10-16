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

const addArtist = artist => {
  console.log('artist before adding id', artist)
  artist._id = pkGen('artist', prop('name', artist))
  console.log('after', artist)
  return db.put(artist)
}

const getArtist = id => db.get(id)
const updateArtist = doc => db.put(doc)
const deleteArtist = id => db.get(id).then(doc => db.remove(doc))

module.exports = {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting,
  addArtist,
  getArtist,
  updateArtist,
  deleteArtist
}
