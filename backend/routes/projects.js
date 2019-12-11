import {
    getProjects,
    deleteProject,
    getProjectParticipants,
    getProjectTasks,
    createProject,
    updateProject,
    getProject
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


router.post('/update/', function(req, res, next) {
    updateProject(req.body, function () {
        res.end("OK")
    })
});

router.post('/delete', function(req, res, next) {
    deleteProject(req.body._id, function () {
        res.end("OK")
    })
});


module.exports = router;
