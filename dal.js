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
const putDoc = doc => db.put(doc)

///////////////////////////////////////////////////////////////////////////////
//                              ADD Painting                                 //
// add an _id prop to the incoming doc  ex:  _id = "painting_" + doc.name    //
// removing preceeding articles 'A' or 'The' from the begining of doc.name   //
///////////////////////////////////////////////////////////////////////////////
const addDoc = doc => {
  doc._id = `${toLower(doc.type)}_${slugify(doc.name.replace(/^a|^the/i, ""), {
    lower: true
  })}`
  return putDoc(doc)
}

///////////////////////////////////////////////////////////////////////////////
//                              GET Painting                                 //
// Retrieve painting from database using its id as a handle                  //
///////////////////////////////////////////////////////////////////////////////
const getDoc = id => db.get(id)

///////////////////////////////////////////////////////////////////////////////
//  UPDATE a Painting:                                                       //
// Updates a specific painting as identified by the {id} route parameter.    //
///////////////////////////////////////////////////////////////////////////////

const updDoc = doc =>
  db.get(doc._id).then(painting => {
    doc._id = painting._id
    doc._rev = painting._rev
    return db.put(doc)
  })

///////////////////////////////////////////////////////////////////////////////
//  DELETE a Painting:                                                       //
//  Deletes a specific painting as identified by the {id} route parameter.   //
///////////////////////////////////////////////////////////////////////////////
const delDoc = id => db.get(id).then(painting => db.remove(painting))

///////////////////////////////////////////////////////////////////////////////
//                             EXPORT FUNCTIONS                              //
///////////////////////////////////////////////////////////////////////////////
module.exports = { addDoc, getDoc, updDoc, delDoc }
