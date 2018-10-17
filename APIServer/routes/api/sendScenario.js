var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();
var convert = require('xml-js');


router.post('/:uid', function(req, res) {
    var jsonData = convert.xml2json(req.body.data);
    var jsonKey = Object.keys(jsonData);
    console.log(jsonData)
});

module.exports = router;