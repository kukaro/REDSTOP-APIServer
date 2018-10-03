var express = require('express');
var router = express.Router();
var responseTimeList = require('./response-time.json');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(responseTimeList);
});

module.exports = router;
