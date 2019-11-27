import {closestDeadlines, employeeRating} from '../db'
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/closest-deadlines', function(req, res, next) {
    closestDeadlines(function (projects) {
        res.end(JSON.stringify(projects))
    })
});

router.get('/employee-rating', function(req, res, next) {
    employeeRating(function (projects) {
        res.end(JSON.stringify(projects))
    })
});

module.exports = router;
