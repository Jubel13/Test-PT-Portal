const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const dbName = "portalDatabase";

let db;

async function connectMongo() {
  try {
    await client.connect();

    db = client.db(dbName);
  } catch (err) {
    console.log(err);
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectMongo, getDatabase };
