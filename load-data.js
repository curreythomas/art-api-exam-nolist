require("dotenv").config()
const PouchDB = require("pouchdb-core")
PouchDB.plugin(require("pouchdb-adapter-http"))

//const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)
const db = new PouchDB(process.env.COUCHDB_URL)

const paintings = [
  {
    _id: "painting_starry-night",
    name: "The Starry Night",
    type: "painting",
    movement: "post-impressionism",
    artist: "Vincent van Gogh",
    yearCreated: 1889,
    museum: { name: "Museum of Modern Art", location: "New York" }
  },
  {
    _id: "painting_water-lilies-nympheas",
    name: "Water Lilies Nympheas",
    type: "painting",
    movement: "impressionism",
    artist: "Claude Monet",
    yearCreated: 1907,
    museum: { name: "Art Gallery of Ontario", location: "Toronto" }
  },
  {
    _id: "painting_last-supper",
    name: "The Last Supper",
    type: "painting",
    movement: "Renaissance",
    artist: "Leonardo da Vinci",
    yearCreated: 1495,
    museum: { name: "Santa Maria delle Grazie", location: "Milan" }
  },
  {
    _id: "painting_sunday-afternoon-on-the_island-of-la-grande-jatte",
    name: "A Sunday Afternoon on the Island of La Grande Jatte",
    type: "painting",
    movement: "impressionism",
    artist: "Georges Seurat",
    yearCreated: 1884,
    museum: { name: "Art Institute of Chicago", location: "Chicago" }
  },
  {
    _id: "painting_guernica",
    name: "Guernica",
    type: "painting",
    movement: "surrealism",
    artist: "Pablo Picasso",
    yearCreated: 1937,
    museum: {
      name: "Museo Nacional Centro de Arte Reina Sofía",
      location: "Madrid"
    }
  },
  {
    _id: "painting_bal-du-moulin-de-la-galette",
    name: "Bal du moulin de la Galette",
    type: "painting",
    movement: "impressionism",
    artist: "Pierre-Auguste Renoires",
    yearCreated: 1876,
    museum: { name: "Musée d’Orsay", location: "Paris" }
  },
  {
    _id: "artist_vincent-van-gogh",
    name: "Vincent van Gogh",
    type: "artist",
    dateBorn: "1853-03-30",
    placeBorn: "Zundert, The Netherlands",
    dateDied: "1890-07-29",
    placeDied: "Auvers-sur-Oise, France",
    movements: "Post-Impressionism, Neo-Impressionism"
  },
  {
    _id: "artist_claude-monet",
    name: "Claude Monet",
    type: "artist",
    dateBorn: "1840-11-14",
    placeBorn: "Paris, France",
    dateDied: "1926-12-05",
    placeDied: "Giverny, France",
    movements: "Impressionism"
  },
  {
    _id: "artist_leonardo-da-vinci",
    name: "Leonardo da Vinci",
    type: "artist",
    dateBorn: "1452-04-15",
    placeBorn: "Anchiano, Italy",
    dateDied: "1519-05-02",
    placeDied: "Clos Lucé, Amboise, France",
    movements: "Renaissance"
  },
  {
    _id: "artist_georges-seurat",
    name: "Georges Seurat",
    type: "artist",
    dateBorn: "1859-12-02",
    placeBorn: "Paris, France",
    dateDied: "1891-03-29",
    placeDied: "Paris, France",
    movements: " Pointillism, Impressionism, Neoclassicism, Divisionism"
  },
  {
    _id: "artist_pablo-picasso",
    name: "Pablo Picasso",
    type: "artist",
    dateBorn: "1881-10-25",
    placeBorn: "Málaga, Spain",
    dateDied: "1973-04-08",
    placeDied: "Mougins, France",
    movements: " Cubism, Surrealism, Expressionism, Post-Impressionism,"
  },
  {
    _id: "artist_pierre-auguste-renoires",
    name: "Pierre-Auguste Renoires",
    type: "artist",
    dateBorn: "1841-02-25",
    placeBorn: "Limoges, France",
    dateDied: "1919-12-03",
    placeDied: "Cagnes-sur-Mer, France",
    movements: "Post-Impressionism, Neo-Impressionism"
  }
]

// store all paintings to database and report results to terminal:
db
  .bulkDocs(paintings)
  .then(data => console.log("Data succesfully uploaded to the database!", data))
  .catch(err => console.log("Error uploading the data!", err))
