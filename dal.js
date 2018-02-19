require("dotenv").config()
const PouchDB = require("pouchdb-core")
PouchDB.plugin(require("pouchdb-adapter-http"))
const HTTPError = require("node-http-error")
const { remove } = require("ramda")
const db = new PouchDB(process.env.COUCHDB_URL)
const pkGen = require("./lib/pk-generator")

///////////////////////////////////////////////////////////////////////////////
//                           PUT Doc                                         //
//  call putDoc to add a doc to the databse                                  //
//  putDoc returns a promise                                                 //
///////////////////////////////////////////////////////////////////////////////
const putDoc = doc => db.put(doc)

///////////////////////////////////////////////////////////////////////////////
//                              ADD Document                                 //
// Generate a new private key and add a new document to the database.        //
///////////////////////////////////////////////////////////////////////////////
const addDoc = doc => {
  doc._id = pkGen(doc)
  return putDoc(doc)
}

///////////////////////////////////////////////////////////////////////////////
//                              GET Document                                 //
// Retrieve document from database using its id as a handle                  //
///////////////////////////////////////////////////////////////////////////////
const getDoc = id => db.get(id)

///////////////////////////////////////////////////////////////////////////////
//  UPDATE a document:                                                       //
// Updates a specific document as identified by the {id} route parameter.    //
///////////////////////////////////////////////////////////////////////////////

const updDoc = doc =>
  db.get(doc._id).then(painting => {
    doc._id = painting._id
    doc._rev = painting._rev
    return db.put(doc)
  })

///////////////////////////////////////////////////////////////////////////////
//  DELETE a Document:                                                       //
//  Deletes a specific document as identified by the {id} route parameter.   //
///////////////////////////////////////////////////////////////////////////////
const delDoc = id => db.get(id).then(painting => db.remove(painting))

///////////////////////////////////////////////////////////////////////////////
//                             EXPORT FUNCTIONS                              //
///////////////////////////////////////////////////////////////////////////////
module.exports = { addDoc, getDoc, updDoc, delDoc }
