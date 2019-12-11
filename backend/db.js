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
                    count_participants: {
                        $size: "$participants"
                    },
                    count_tasks: {
                        $size: "$tasks"
                    },
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

export const getNotProjectParticipants = function (projectId, callback) {
    db.collection('employee').aggregate([{
        $lookup: {
            from: "project",
            localField: "_id",
            foreignField: "participants.employee",
            as: "join_table"
        }
    }, {
        $match: {
            "join_table._id": {
                $ne: ObjectID(projectId)
            }
        }
    }, {
        $project: {
            "fio": 1
        }
    }]).toArray(function (err, docs) {
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
            "_id": "$tasks._id",
            "name": "$tasks.name",
            "fio": {$arrayElemAt: ["$join_table.fio", 0]},
            "date_of_control": "$tasks.date_of_control",
            "status": "$tasks.status"
        }
    }]).toArray(function (err, docs) {
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
                "date_of_control": 1,

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
                        $gte: new Date("2000-00-00T00:00:00.000+00:00")
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
                "rating": -1,
            }
        }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};


export const getProject = function (id, callback) {
    db.collection('project').findOne({_id: ObjectID(id)}, function (err, docs) {
        callback(docs);
    });
};

export const createProject = function (project, callback) {
    db.collection('project').insertOne({
        name: project.projectName,
        tags: project.tags,
        tasks: [],
        participants: [],
    }, function (err, docs) {
        callback(docs);
    });
};

export const updateProject = function (project, callback) {
    db.collection('project').update({
        _id: ObjectID(project._id)
    }, {
        $set: {
            name: project.projectName,
            tags: project.tags,
        }
    }, {
        upsert: false
    }, function (err, docs) {
        callback(docs);
    });
};

export const createParticipant = function (participant, callback) {
    db.collection('project').update({
        _id: ObjectID(participant.projectId)
    }, {
        $push: {
            participants: {
                "employee": ObjectID(participant.participantId),
                "role": participant.role,
            }
        }
    }, function (err, docs) {
        callback(docs);
    });
};

export const updateParticipant = function (participant, callback) {
    db.collection('project').update({
        $and: [{
            _id: ObjectID(participant.projectId)
        }, {
            "participants.employee": ObjectID(participant.participantId)
        }]
    }, {
        $set: {
            "participants.$.role": participant.role,
        }
    }, {
        upsert: false
    }, function (err, docs) {
        callback(docs);
    });
};

export const deleteParticipant = function (participant, callback) {
    db.collection('project').update({
        _id: ObjectID(participant.projectId)
    }, {
        $pull: {
            participants: {
                "employee": ObjectID(participant.participantId)
            }
        }
    }, function (err, docs) {
        callback(docs);
    });
};

export const getParticipant = function (projectId, participantId, callback) {
    db.collection('project').aggregate([{
        $unwind: "$participants"
    }, {
        $match: {
            $and: [{
                "_id": ObjectID(projectId)
            }, {
                "participants.employee": ObjectID(participantId)
            }]
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
            "fio": {
                $arrayElemAt: ["$join_table.fio", 0]
            }
        }
    }]).toArray(function (err, docs) {
        callback(docs[0]);
    });
};


export const createTask = function (task, callback) {
    db.collection("project").update({
        _id: ObjectID(task.projectId)
    }, {
        $push: {
            tasks: {
                "employee": ObjectID(task.participant),
                "name": task.taskName,
                "date_of_control": new Date(task.date),
                "status": task.status,
                _id: new ObjectID()
            }
        }
    }, function (err, docs) {
        callback(docs);
    });
};


export const updateTask = function (task, callback) {
    db.collection("project").update({
        "tasks._id": ObjectID(task.taskId)
    }, {
        $set: {
            "tasks.$.status": task.status,
            "tasks.$.employee": ObjectID(task.participant),
            "tasks.$.name": task.taskName,
            "tasks.$.date_of_control": new Date(task.date),
        }
    }, {
        upsert: false
    }, function (err, docs) {
        callback(docs);
    });
};


export const deleteTask = function (task, callback) {
    db.collection('project').update({
        _id: ObjectID(task.projectId)
    }, {
        $pull: {
            tasks: {
                _id: ObjectID(task.taskId)
            }
        }
    }, function (err, docs) {
        callback(docs);
    });
};

export const getTask = function (projectId, taskId, callback) {
    db.collection("project").aggregate([{
        $unwind: "$tasks"
    }, {
        $match: {
            "tasks._id": ObjectID(taskId)
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
            "name": "$tasks.name",
            "fio": {$arrayElemAt: ["$join_table.fio", 0]},
            "employeeId": {$arrayElemAt: ["$join_table._id", 0]},
            "date_of_control": "$tasks.date_of_control",
            "status": "$tasks.status"
        }
    }]).toArray(function (err, docs) {
        callback(docs[0]);
    });
};

export const tasksChart = function (dateStart, dateEnd, taskStatus, filterBy, callback) {
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
                        $gte: new Date(dateStart)
                    }
                }, {
                    "tasks.date_of_control": {
                        $lte: new Date(dateEnd)
                    }
                }, {
                    "tasks.status": new RegExp(taskStatus === "all" ? "" : taskStatus, "i"),
                }]
            }
        },
        {
            $group: {
                _id: (() => {
                    switch (filterBy) {
                        case "employee":
                            return "$join_table.fio";
                        case "education":
                            return "$join_table.education";
                        case "university":
                            return "$join_table.graduated_institution";
                        case "project":
                            return "$name";
                    }
                })(),
                "value": {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                "_id": 0,
                "field": filterBy === 'project' ? "$_id" : {$arrayElemAt: ["$_id", 0]},
                "value": 1
            }
        },
        {
            $sort: {
                "value": -1
            }
        }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};
export const institutionRating = function (callback) {
    db.getCollection("Project").aggregate([
        {
            $unwind: "$tasks"
        },
        {
            $lookup: {
                from: "Employee",
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
                _id: "$join_table.graduated_institution",
                "Rating": {
                    $sum: {
                        $cond: [{
                            $eq: ["$tasks.status", "Выполнено в срок"]
                        }, 1, {
                            $cond: [{
                                $eq: ["$tasks.status", "Выполнено не в срок"]
                            }, - 1, 0]
                        }]
                    }
                }
            }
        },
        {
            $sort: {
                "Rating": - 1,
                
            }
        }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};
export const educationRating = function (callback) {
    db.getCollection("Project").aggregate([
        {
            $unwind: "$tasks"
        },
        {
            $lookup: {
                from: "Employee",
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
                _id: "$join_table.education",
                "Rating": {
                    $sum: {
                        $cond: [{
                            $eq: ["$tasks.status", "Выполнено в срок"]
                        }, 1, {
                            $cond: [{
                                $eq: ["$tasks.status", "Выполнено не в срок"]
                            }, - 1, 0]
                        }]
                    }
                }
            }
        },
        {
            $sort: {
                "Rating": - 1
            }
        }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};



export const projectRating = function (callback) {
    db.getCollection("Project").aggregate([
        {
            $unwind: "$tasks"
        },
        {
            $lookup: {
                from: "Employee",
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
                _id: "$name",
                "Rating": {
                    $sum: {
                        $cond: [{
                            $eq: ["$tasks.status", "Выполнено в срок"]
                        }, 1, {
                            $cond: [{
                                $eq: ["$tasks.status", "Выполнено не в срок"]
                            }, - 1, 0]
                        }]
                    }
                }
            }
        },
        {
            $sort: {
                "Rating": - 1, 
            }
        }
    ]).toArray(function (err, docs) {
        callback(docs);
    });
};