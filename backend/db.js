const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://100.124.0.7:32247';
const dbName = 'nosql-projects';
let db;

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

export const getUsers = function (fioLike, callback) {
    db.collection('employee').find({fio: new RegExp(fioLike || "", "i")}).toArray(function (err, docs) {
        callback(docs);
    });
};
export const addUser = function (user, callback) {
    db.collection('employee').insertOne({
        fio: user.fio,
        date_of_birth: user.dateOfBirth,
        education: user.education,
        graduated_institution: user.university
    },function (err, docs) {
        callback(docs);
    });
};
