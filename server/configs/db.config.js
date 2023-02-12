const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const conxnURL = 'mongodb://localhost:27017'
const dbName = 'group32db';
const Oid = mongodb.ObjectId;

module.exports = {
    MongoClient: MongoClient,
    conxnURL: conxnURL,
    dbName: dbName,
    Oid: Oid
}