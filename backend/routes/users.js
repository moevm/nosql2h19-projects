import {getUsers, addUser} from '../db'
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  getUsers(req.query.fio, function (users) {
    res.end(JSON.stringify(users))
  })
});

router.post('/create', function(req, res, next) {
  addUser(req.body, function () {
    res.end("OK")
  })
});

module.exports = router;
