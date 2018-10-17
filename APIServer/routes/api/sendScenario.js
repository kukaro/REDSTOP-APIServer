var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();
var convert = require('xml-js');


router.post('/:uid', function(req, res) {
    var jsonData = convert.xml2json(req.body.data);
    jsonData = JSON.parse(jsonData)['elements'];
    var jsonKey = Object.keys(jsonData);
    console.log(jsonData);
    console.log(jsonKey);
});

module.exports = router;