var express = require('express');
var router = express.Router();
const {spawn} = require('child_process');
var fs = require('fs');
var archiver = require('archiver');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const ls = spawn('mongodump', ['--host=100.124.0.7', '--port=32247', '--db=nosql-projects', "--gzip", '--archive=./backup.zip']);
    ls.on('close', (code) => {
        res.download('./backup.zip');
    });
});
module.exports = router;
