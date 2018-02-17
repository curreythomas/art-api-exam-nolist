require("dotenv").config()
const PouchDB = require("pouchdb-core")
PouchDB.plugin(require("pouchdb-adapter-http"))
const HTTPError = require("node-http-error")
const { pluck, startsWith, toLower, remove } = require("ramda")
const db = new PouchDB(process.env.COUCHDB_URL)
const slugify = require("slugify")

///////////////////////////////////////////////////////////////////////////////
//                           ADD Doc                                         //
//  call addDoc to add a doc to the databse                                  //
//  addDoc returns a promise                                                 //
///////////////////////////////////////////////////////////////////////////////
const addDoc = doc => db.put(doc)

///////////////////////////////////////////////////////////////////////////////
//                              ADD Painting                                 //
// add an _id prop to the incoming doc  ex:  _id = "painting_" + doc.name    //
// removing preceeding articles 'A' or 'The' from the begining of doc.name   //
///////////////////////////////////////////////////////////////////////////////
const addPainting = doc => {
  doc._id = `${toLower(doc.type)}_${slugify(doc.name.replace(/^a|^the/i, ""), {
    lower: true
  })}`
  return addDoc(doc)
}

module.exports = { addPainting }
