var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var headerList = ['Test Block','Scenario','Report','Monitoring','Scheduler'];
    res.send(headerList);
});

module.exports = router;
