const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)
const { toLower } = require('ramda')

const addPainting = paint => {
  const paintToLower = paint.name.toLower()
  const spacesToUnderscores = paintToLower.replace(' ', '_')
  const concatPainting = 'painting-' + spacesToUnderscores
  paint._id = concatPainting
  paint.type = 'painting'
  return db.put(paint)
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
