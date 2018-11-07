var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();
var convert = require('xml-js');
var queue = require('queue');

var DEBUG = 0;

router.post('/:uid', function (req, res) {
    var jsonData = convert.xml2json(req.body.data, {compact: true});
    console.log(jsonData);
    jsonData = JSON.parse(jsonData)['xml'];
    // var jsonKey = Object.keys(jsonData);
    // console.log(jsonData);
    // console.log(jsonKey);
    console.log(jsonData.block);
    console.log(jsonData.block.statement);
    console.log(jsonData.block.statement._attributes);
    dfs(jsonData);
});

router.post('/:owner/:projectid/:scenarioname', function (req, res, next) {
    let test = req.params;
    res.send(test);
});

function dfs(jsonData){
    console.log('START BFS');
    let returnJson = {};
    // dfs(jsonData['block']['statement'][''])
    console.log('END BFS');
    return returnJson
}

module.exports = router;