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
    db.collection('project').aggregate([
            {
                $match: {
                    "name": new RegExp(nameLike || "", "i"),
                }
            },
            {
                "$project": {
                    name: true,
                    tags: true,
                    count: {
                        $size: "$participants"
                    }
                }
            }
        ]
    ).toArray(function (err, docs) {
        callback(docs);
    });
};

export const getProjectParticipants = function (projectId, callback) {
    db.collection('project').aggregate([{
        $unwind: "$participants"
    }, {
        $match: {
            "_id": ObjectID(projectId)
        }
    }, {
        $lookup: {
            from: "employee",
            localField: "participants.employee",
            foreignField: "_id",
            as: "join_table"
        }
    }, {
        $project: {
            "role": "$participants.role",
            "join_table": {"$arrayElemAt": ['$join_table', 0]},
        }
    }, {
        $project: {
            "_id": "$join_table._id",
            "fio": "$join_table.fio",
            // "graduated_institution": "$join_table.graduated_institution",
            "role": "$role",
        }
    }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};

export const getProjectTasks = function (projectId, callback) {
    db.collection('project').aggregate([{
        $unwind: "$tasks"
    }, {
        $match: {
            "_id": ObjectID(projectId)
        }
    }, {
        $lookup: {
            from: "employee",
            localField: "tasks.employee",
            foreignField: "_id",
            as: "join_table"
        }
    }, {
        $project: {
            "_id": 0,
            "key": "$tasks.key",
            "name": "$tasks.name",
            "date_of_control": "$tasks.date_of_control",
            "status": "$tasks.status",
            "join_table": {"$arrayElemAt": ['$join_table', 0]},
        }
    }, {
        $project: {
            "_id": 0,
            "key": "$key",
            "name": "$name",
            "date_of_control": "$date_of_control",
            "status": "$status",
            "fio": '$join_table.fio',
        }
    }, {
        $sort: {
            date_of_control: -1
        }
    }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};

export const deleteProject = function (id, callback) {
    db.collection('project').remove({
        _id: ObjectID(id),
    }, function (err, docs) {
        callback(docs);
    });
};

export const closestDeadlines = function (callback) {
    db.collection("project").aggregate([
        {
            $unwind: "$tasks"
        },
        {
            $lookup: {
                from: "employee",
                localField: "tasks.employee",
                foreignField: "_id",
                as: "join_table"
            }
        },
        {
            $match: {
                $and: [{
                    "tasks.date_of_control": {
                        $lte: new Date((new Date().getTime() + (7 * 24 * 60 * 60 * 1000)))
                    }
                }, {
                    "tasks.date_of_control": {
                        $gte: new Date()
                    }
                }, {
                    "tasks.status": {$eq: "В работе"}
                }
                ]
            }
        },
        {
            $project: {
                "name": 1,
                "task": "$tasks.name",
                "date_of_control": "$tasks.date_of_control",
                "join_table": {"$arrayElemAt": ['$join_table', 0]},
            }
        },
        {
            $project: {
                "name": 1,
                "task": 1,
                "date_of_control": 1,
                "fio": '$join_table.fio',
            }
        },
        {
            $sort: {
                "tasks.date_of_control": 1,

            }
        }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};

export const employeeRating = function (callback) {
    db.collection("project").aggregate([
        {
            $unwind: "$tasks"
        },
        {
            $lookup: {
                from: "employee",
                localField: "tasks.employee",
                foreignField: "_id",
                as: "join_table"
            }
        },
        {
            $match: {
                $and: [{
                    "tasks.date_of_control": {
                        $gte: new Date("2019-10-01T00:00:00.000+00:00")
                    }
                }, {
                    "tasks.date_of_control": {
                        $lte: new Date("2019-12-31T00:00:00.000+00:00")
                    }
                }]
            }
        },
        {
            $group: {
                _id: "$join_table.fio",
                "rating": {
                    $sum: {
                        $cond: [{
                            $eq: ["$tasks.status", "Выполнено в срок"]
                        }, 1, {
                            $cond: [{
                                $eq: ["$tasks.status", "Выполнено не в срок"]
                            }, -5, 0]
                        }]
                    }
                }
            }
        },
        {
            $project: {
                "_id": 0,
                "rating": 1,
                "fio": {"$arrayElemAt": ['$_id', 0]},
            }
        },
        {
            $sort: {
                "rating": - 1,
            }
        }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};

// export const removeParticipant = function (nameLike, callback) {
//     db.collection('project').update({
//         _id: ObjectId("5db00ba20a1300004f00190b")
//     }, {
//         $pull: {
//             participants: {
//                 "employee": ObjectId("5daf5117cab8f846d8ec2223")
//             }
//         }
//     }).toArray(function (err, docs) {
//         callback(docs);
//     });
// };
//
// export const removeTask = function (nameLike, callback) {
//     db.collection('project').update({
//         _id: ObjectId("5db00ba20a1300004f00190b")
//     }, {
//         $pull: {
//             tasks: {
//                 "key": "t12745937"
//             }
//         }
//     }).toArray(function (err, docs) {
//         callback(docs);
//     });
// };
//
// export const insertProject = function (nameLike, callback) {
//     db.collection('project').insertOne({"name":"PaxPeer","tags":"Теги"}).toArray(function (err, docs) {
//         callback(docs);
//     });
// };
//
// export const insertParticipant = function (nameLike, callback) {
//     db.collection('project').update({
//         _id: ObjectId("5db00ba20a1300004f00190b")
//     }, {
//         $push: {
//             participants: {
//                 "employee": ObjectId("5daf5117cab8f846d8ec2223"),
//                 "role": "Backend-разработчик"
//             }
//         }
//     }).toArray(function (err, docs) {
//         callback(docs);
//     });
// };
//
// export const insertTask = function (nameLike, callback) {
//     db.collection('project').update({
//         _id: ObjectId("5db00ba20a1300004f00190b")
//     }, {
//         $push: {
//             tasks: {
//                 "key": "t12745937",
//                 "employee": ObjectId("5daf5117cab8f846d8ec2223"),
//                 "name": "Интеграция переходов между слайдами блока Our opportunities",
//                 "date_of_control": "2019-10-18T00:00:00.000Z",
//                 "status": "Выполнено в срок"
//             }
//         }
//     }).toArray(function (err, docs) {
//         callback(docs);
//     });
// };
//
// export const updateProject = function (nameLike, callback) {
//     db.collection('project').update({
//         _id: ObjectId("5db00ba20a1300004f00190b")
//     }, {
//         $set: {
//             tags: "Hello"
//         }
//     }, {
//         upsert: false
//     }).toArray(function (err, docs) {
//         callback(docs);
//     });
// };
//
// export const updateParticipant = function (nameLike, callback) {
//     db.collection('project').update({
//         $and: [{
//             _id: ObjectId("5db00ba20a1300004f00190b")
//         }, {
//             "participants.employee": ObjectId("5daf52adcab8f846d8ec222c")
//         }]
//     }, {
//         $set: {
//             "participants.$.role": "НОВАЯ РОЛЬ"
//         }
//     }, {
//         upsert: false
//     }).toArray(function (err, docs) {
//         callback(docs);
//     });
// };
//
// export const updateTask = function (nameLike, callback) {
//     db.collection('project').update({
//         "tasks.key": "t12742954"
//     }, {
//         $set: {
//             "tasks.$.status": "В работе"
//         }
//     }, {
//         upsert: false
//     }).toArray(function (err, docs) {
//         callback(docs);
//     });
// };