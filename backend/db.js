import {MongoClient, ObjectID} from 'mongodb'
// const MongoClient = require('mongodb').MongoClient;
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

export const getUser = function (id, callback) {
    db.collection('employee').findOne({_id: ObjectID(id)}, function (err, docs) {
        callback(docs);
    });
};

export const addUser = function (user, callback) {
    db.collection('employee').insertOne({
        fio: user.username,
        date_of_birth: new Date(user.dateOfBirth),
        education: user.education,
        graduated_institution: user.university
    }, function (err, docs) {
        callback(docs);
    });
};

export const updateUser = function (user, callback) {
    db.collection('employee').update({
        _id: ObjectID(user._id),
    }, {
        fio: user.username,
        date_of_birth: new Date(user.dateOfBirth),
        education: user.education,
        graduated_institution: user.university
    }, function (err, docs) {
        callback(docs);
    });
};

export const deleteUser = function (id, callback) {
    db.collection('employee').remove({
        _id: ObjectID(id),
    }, function (err, docs) {
        callback(docs);
    });
};

export const getProjects = function (nameLike, callback) {
    db.collection('project').aggregate(
        {
            "$project": {
                name: true,
                tags: true,
                count: {
                    $size: "$participants"
                }
            }
        }
    ).toArray(function (err, docs) {
        callback(docs);
    });
};

