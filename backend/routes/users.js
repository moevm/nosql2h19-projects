import {getUsers} from '../db'
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  console.log(req.query);
  getUsers(req.query.fio, function (users) {
    res.end(JSON.stringify(users))
  })
});

module.exports = router;
