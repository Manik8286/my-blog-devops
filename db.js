const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connect() {
    if (!client.isConnected()) {
        await client.connect();
    }
    return client.db('blog');
}

module.exports = connect;
