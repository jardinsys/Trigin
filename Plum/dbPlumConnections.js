const { MongoClient } = require('mongodb');
const {TigerDBUrl, TigerDBName} = require('../databases.json');

/*
const TigerDBUrl = 'mongodb://localhost:27017';
const TigerDBName = 'your_database_name';
*/
let db = null;

async function connectToDatabase() {
    if (db) return db;
    
    try {
        const client = await MongoClient.connect(TigerDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(TigerDBName);
        console.log('Connected Plum to Tiger MongoDB');
        return db;
    } catch (error) {
        console.error('Failed to connect Plum to Tiger MongoDB', error);
        process.exit(1);
    }
}

module.exports = { connectToDatabase }