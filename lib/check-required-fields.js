const { keys, difference } = require('ramda')

module.exports = (reqFields, reqBody) => difference(reqFields, keys(reqBody))
