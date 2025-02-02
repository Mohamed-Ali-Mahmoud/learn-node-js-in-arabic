const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://mohamedalimahmoudali:node123@learn-mongo-db.vqka3.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";

const client = new MongoClient(url);

const main = async () => {
  await client.connect();
  console.log("Connecting to the database...");

  const db = client.db("codezone");
  const collection = db.collection("courses");

  const data = await collection.find({}).toArray();
  console.log(data);
};

main();
