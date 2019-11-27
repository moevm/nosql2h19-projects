var express = require('express');
var router = express.Router();
const {spawn} = require('child_process');
var fs = require('fs');
var archiver = require('archiver');
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })
/* GET users listing. */
router.post('/', upload.single('file'), function (req, res, next) {
    const ls = spawn('mongorestore', ['--host=100.124.0.7', '--port=32247', "--gzip", '--archive=./uploads/' + req.file.filename]);
    ls.on('close', (code) => {
        res.send('ok');
    });
});
module.exports = router;
