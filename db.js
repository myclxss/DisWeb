// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://l22990271:Ya7nRxpeR25rZV31@cluster0.f9bdie9.mongodb.net";
const client = new MongoClient(uri);

async function fetchData() {
    try {
        await client.connect();
        const database = client.db('DisHub');
        const collection = database.collection('players');
        const result = await collection.find({}).toArray();
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = fetchData;