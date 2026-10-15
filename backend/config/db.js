const { MongoClient } = require("mongodb");

let dbInstance = null;
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const dbname = process.env.DBNAME;
    const client = new MongoClient(uri);
    await client.connect();
    dbInstance = client.db(dbname);
    console.log(`MongoDB Native Connected to Database: "${dbname}"`);
  } catch (err) {
    console.log(
      `Erro connectionto the database: ${err.name} -- ${err.message}`,
    );
    process.exit(1);
  }
};

const getDB = () => {
  if (!dbInstance) {
    throw new Error("You must first call the connect db function");
  }

  return dbInstance;
};

module.exports = {
  connectDB,
  getDB,
};
