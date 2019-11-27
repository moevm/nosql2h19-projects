import {getProjects, deleteProject, getProjectParticipants, getProjectTasks} from '../db'
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
    getProjects(req.query.name, function (projects) {
        res.end(JSON.stringify(projects))
    })
});

router.get('/participants', function(req, res, next) {
    getProjectParticipants(req.query.id, function (projects) {
        res.end(JSON.stringify(projects))
    })
});

router.get('/tasks', function(req, res, next) {
    getProjectTasks(req.query.id, function (projects) {
        res.end(JSON.stringify(projects))
    })
});


// router.get('/get', function(req, res, next) {
//     getUser(req.query.id, function (user) {
//         res.end(JSON.stringify(user))
//     })
// });

// router.post('/create', function(req, res, next) {
//     addUser(req.body, function () {
//         res.end("OK")
//     })
// });
//
// router.post('/update', function(req, res, next) {
//     updateUser(req.body, function () {
//         res.end("OK")
//     })
// });
//
router.post('/delete', function(req, res, next) {
    deleteProject(req.body._id, function () {
        res.end("OK")
    })
});


module.exports = router;
