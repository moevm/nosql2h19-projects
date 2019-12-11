import {closestDeadlines, employeeRating, tasksChart} from '../db'

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/closest-deadlines', function (req, res, next) {
    closestDeadlines(function (projects) {
        res.end(JSON.stringify(projects))
    })
});

router.get('/employee-rating', function (req, res, next) {
    employeeRating(function (projects) {
        res.end(JSON.stringify(projects))
    })
});

router.get('/tasks-chart', function (req, res, next) {
    tasksChart(req.query.dateStart, req.query.dateEnd, req.query.taskStatus, req.query.filterBy, function (statistic) {
        res.end(JSON.stringify(statistic))
    })
});

module.exports = router;
