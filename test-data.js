///////////////////////////////////////////////////////////////////
/// Test Paintings with names starting with 'A' and 'The'       ///
///////////////////////////////////////////////////////////////////

const aPainting = {
  name: "A Bar at the Folies-Bergère",
  type: "painting",
  movement: "realism",
  artist: "Éduard Manet",
  yearCreated: 1882,
  museum: { name: "Courtauld Gallery", location: "London" }
}

const thePainting = {
  name: "The Large Bathers",
  type: "Painting",
  movement: "post-impressionism",
  artist: "Paul Cézanne",
  yearCreated: 1906,
  museum: { name: "Philadelphia Museum of Art", location: "Philadelphia" }
}

const otherPainting = {
  name: "Liberty Leading the People",
  type: "PAINTING",
  movement: "French neoclassicism",
  artist: "Eugène Delacroix",
  yearCreated: 1830,
  museum: { name: "The Louvre", location: "Paris" }
}
module.exports = { aPainting, thePainting }
