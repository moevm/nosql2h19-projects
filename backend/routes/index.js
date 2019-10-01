var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  db.findDocuments(function (docs) {
    res.end(JSON.stringify({text: docs[0].text}))
  })

});

module.exports = router;
