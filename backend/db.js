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

export const getParticipants = function (nameLike, callback) {
    db.collection('project').aggregate({
        $unwind: "$participants"
    }, {
        $match: {
            "_id": ObjectId("5db00ba20a1300004f00190b")
        }
    }, {
        $lookup: {
            from: "Employee",
            localField: "participants.employee",
            foreignField: "_id",
            as: "join_table"
        }
    }, {
        $project: {
            "participants.role": 1,
            "join_table.fio": 1,
        }
    }).toArray(function (err, docs) {
        callback(docs);
    });
};

export const getTasks = function (nameLike, callback) {
    db.collection('project').aggregate({
        $unwind: "$tasks"
    }, {
        $match: {
            "_id": ObjectId("5db00ba20a1300004f00190b")	}
    }, {
        $lookup: {
            from: "Employee",
            localField: "tasks.employee",
            foreignField: "_id",
            as: "join_table"
        }
    }, {
        $project: {
            "tasks.key": 1,
            "tasks.name": 1,
            "join_table.fio": 1,
            "tasks.date_of_control": 1,
            "tasks.status": 1
        }
    }).toArray(function (err, docs) {
        callback(docs);
    });
};

export const removeProject = function (nameLike, callback) {
    db.collection('project').remove({
        _id: ObjectId("5db009780a1300004f001908")
    }).toArray(function (err, docs) {
        callback(docs);
    });
};

export const removeParticipant = function (nameLike, callback) {
    db.collection('project').update({
        _id: ObjectId("5db00ba20a1300004f00190b")
    }, {
        $pull: {
            participants: {
                "employee": ObjectId("5daf5117cab8f846d8ec2223")
            }
        }
    }).toArray(function (err, docs) {
        callback(docs);
    });
};