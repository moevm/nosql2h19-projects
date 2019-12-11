import {
    getProjects,
    deleteProject,
    getProjectParticipants,
    getProjectTasks,
    createProject,
    updateProject,
    getProject,
    createParticipant, getNotProjectParticipants, deleteParticipant, updateParticipant, getParticipant,
    deleteTask, createTask, updateTask, getTask


} from '../db'
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
    getProjects(req.query.name, function (projects) {
        res.end(JSON.stringify(projects))
    })
});

router.get('/participants', function(req, res, next) {
    getProjectParticipants(req.query.id, function (participants) {
        res.end(JSON.stringify(participants))
    })
});

router.get('/not-participants', function(req, res, next) {
    getNotProjectParticipants(req.query.id, function (participants) {
        res.end(JSON.stringify(participants))
    })
});

router.get('/tasks', function(req, res, next) {
    getProjectTasks(req.query.id, function (tasks) {
        res.end(JSON.stringify(tasks))
    })
});

router.get('/get', function(req, res, next) {
    getProject(req.query.id, function (project) {
        res.end(JSON.stringify(project))
    })
});


router.post('/create', function(req, res, next) {
    createProject(req.body, function () {
        res.end("OK")
    })
});


router.post('/update', function(req, res, next) {
    updateProject(req.body, function () {
        res.end("OK")
    })
});

router.post('/delete', function(req, res, next) {
    deleteProject(req.body._id, function () {
        res.end("OK")
    })
});

router.post('/create-participant', function(req, res, next) {
    createParticipant(req.body, function () {
        res.end("OK")
    })
});

router.post('/delete-participant', function(req, res, next) {
    deleteParticipant(req.body, function () {
        res.end("OK")
    })
});

router.post('/update-participant', function(req, res, next) {
    updateParticipant(req.body, function () {
        res.end("OK")
    })
});

router.get('/get-participant', function(req, res, next) {
    getParticipant(req.query.projectId, req.query.participantId, function (participant) {
        res.end(JSON.stringify(participant))
    })
});

router.post('/create-task', function(req, res, next) {
    createTask(req.body, function () {
        res.end("OK")
    })
});

router.post('/delete-task', function(req, res, next) {
    deleteTask(req.body, function () {
        res.end("OK")
    })
});

router.post('/update-task', function(req, res, next) {
    updateTask(req.body, function () {
        res.end("OK")
    })
});

router.get('/get-task', function(req, res, next) {
    getTask(req.query.projectId, req.query.taskId, function (task) {
        res.end(JSON.stringify(task))
    })
});

module.exports = router;
