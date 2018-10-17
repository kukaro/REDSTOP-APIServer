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
    makeTree(jsonData);
});

function makeTree(jsonData){
    console.log('ENTER MAKE TREE');
    console.log(jsonData);
    let returnJson = {};
    let q = queue();
    q.push(jsonData);
    while(true){
        if(DEBUG==1){
            break;
        }
        let tmp = q.pop();
        console.log(tmp);
        DEBUG++;
    }
    console.log(returnJson);
    console.log('LEAVE MAKE TREE');
    return returnJson
}

module.exports = router;