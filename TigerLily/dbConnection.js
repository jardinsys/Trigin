const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/trigin';
const dbName = 'tigerlily';

let db = null;

async function connectToDatabase() {
    if (db) return db;
    
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db(dbName);
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}

module.exports = { connect };