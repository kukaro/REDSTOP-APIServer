var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();


router.post('/:uid', function(req, res) {
    console.log(req)
});

module.exports = router;