const {
  compose,
  split,
  toLower,
  join,
  concat,
  contains,
  head,
  drop,
  tap
} = require('ramda')

const removeFirstWord = arrPainting =>
  contains(head(arrPainting), ['the', 'a']) ? drop(1, arrPainting) : arrPainting

module.exports = (prefix, value) =>
  compose(
    tap(x => console.log(x)),
    concat(prefix + '_'),
    join('_'),
    removeFirstWord,
    split(' '),
    toLower
  )(value)
