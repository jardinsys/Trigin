const { MongoClient } = require('mongodb');
const {TigerDBUrl, TigerDBName, SugarDBUrl, SugarDBName} = require('../databases.json');

/*
const TigerDBUrl = 'mongodb://localhost:27017';
const TigerDBName = 'your_database_name';
*/
let mainDB = null;
let dbSug = null;

async function connectToTigerDatabase() {
    if (mainDB) return mainDB;
    
    try {
        const client = await MongoClient.connect(TigerDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        mainDB = client.db(TigerDBName);
        console.log('Connected Sugar to Tiger MongoDB');
        return mainDB;
    } catch (error) {
        console.error('Failed to connect Sugar to Tiger MongoDB', error);
        process.exit(1);
    }
}

async function connectToSugarDatabase() {
    if (dbSug) return dbSug;
    
    try {
        const client = await MongoClient.connect(SugarDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        dbSug = client.db(SugarDBName);
        console.log('Connected Sugar to Sugar MongoDB');
        return dbSug;
    } catch (error) {
        console.error('Failed to connect Sugar to Sugar MongoDB', error);
        process.exit(1);
    }
}

module.exports = { connectToTigerDatabase, connectToSugarDatabase }