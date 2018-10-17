var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();


router.get('/:uid', function(req, res) {
    console.log(req)
});

module.exports = router;