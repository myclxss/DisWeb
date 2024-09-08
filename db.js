const { MongoClient } = require('mongodb');

const uri = "mongodb://admin:rUABLenSiDiVeRaTeRiDANtERCHENE@149.56.107.190:27017";
const client = new MongoClient(uri);

async function fetchData() {
    try {
        await client.connect();
        const database = client.db('OrbitBoss');
        const collection = database.collection('Users');
        const result = await collection.find({}).sort({ bossKills: -1 }).toArray(); // Ordenar por joinCount en orden descendente
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

module.exports = fetchData;