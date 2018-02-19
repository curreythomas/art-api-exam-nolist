///////////////////////////////////////////////////////////////////////////////
//  Check Required Fields for PUT and POST html verbs                        //
//  Returns an array containin fields that are missing
///////////////////////////////////////////////////////////////////////////////

const { difference, keys, filter } = require("ramda")

const checkReqFields = (httpComm, reqFields, doc) => {
  if (httpComm === "POST") {
    return difference(filter(s => s !== "_id", reqFields), keys(doc))
  } else {
    return difference(reqFields, keys(doc))
  }
}

module.exports = { checkReqFields }
