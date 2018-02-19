///////////////////////////////////////////////////////////////////////////////
//                    Primary Key Generator                                  //
//  - Uses the `type` and `name` fields in the creation of the `_id` value.  //
//  - Slugifies `name` while removing preceding articles "a" or "the"        //
///////////////////////////////////////////////////////////////////////////////
const slugify = require("slugify")
const { toLower } = require("ramda")

module.exports = pkGen = doc =>
  `${toLower(doc.type)}_${slugify(doc.name.replace(/^a|^the/i, ""), {
    lower: true
  })}`
