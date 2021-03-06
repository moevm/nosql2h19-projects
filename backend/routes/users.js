import {getUsers, getUser, addUser, updateUser, deleteUser} from '../db'
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  getUsers(req.query.fio, function (users) {
    res.end(JSON.stringify(users))
  })
});

router.get('/get', function(req, res, next) {
    getUser(req.query.id, function (user) {
        res.end(JSON.stringify(user))
    })
});

router.post('/create', function(req, res, next) {
  addUser(req.body, function () {
    res.end("OK")
  })
});

router.post('/update', function(req, res, next) {
    updateUser(req.body, function () {
        res.end("OK")
    })
});

router.post('/delete', function(req, res, next) {
    deleteUser(req.body._id, function () {
        res.end("OK")
    })
});


module.exports = router;
