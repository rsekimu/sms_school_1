const { MongoClient } = require("mongodb");

const connectToDB = async (dbname) => {
    try {
        const client = await MongoClient.connect(dbname);
        console.log("Succefully connected to the database",client)
    }
}
