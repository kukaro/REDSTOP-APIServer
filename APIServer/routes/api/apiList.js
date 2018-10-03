var express = require('express');
var router = express.Router();
var apiList = require('./apiList.json');

router.get('/', function (req, res, next) {
    res.send(apiList)
});

router.get('/:id', function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    var apiList = apiList.filter(function (apiList) {
        return apiList.id === id
    });
    res.send(apiList)
});

module.exports = router;
