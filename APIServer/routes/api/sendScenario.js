var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();
var convert = require('xml-js');
var queue = require('queue');


router.post('/:uid', function (req, res) {
    var jsonData = convert.xml2json(req.body.data, {compact: true});
    console.log(jsonData);
    jsonData = JSON.parse(jsonData)['xml']['block'];
    // var jsonKey = Object.keys(jsonData);
    // console.log(jsonData);
    // console.log(jsonKey);
    makeTree(jsonData);
});

function makeTree(jsonData){
    console.log(returnJson);
    let returnJson = {};
    let q = queue();
    console.log(returnJson);
    return returnJson
}

module.exports = router;