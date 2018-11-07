var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();
var convert = require('xml-js');
var queue = require('queue');
var Database = require('../../model/common');

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

//TODO 이거 owner로 부를 수 있는데 귀찮으니 생략하는 겁니다.
router.get('/:owner/:projectId/:scenarioName', function (req, res, next) {
    let sql = `select * from rs_${req.params.projectId}_${req.params.scenarioName}_block`;
    Database.query(sql, [],(row) => {
        console.log(row)
        res.send(row)
    });
});

router.post('/:owner/:projectId/:scenarioName', function (req, res, next) {
    let test = {params: req.params, body: req.body};
    let {owner, projectId, scenarioName} = req.params;
    let sql = `
        create table if not exists rs_${projectId}_${scenarioName}_block(
        id varchar(100) not null,
        name varchar(300) not null,
        type set ('group','case','api') not null,
        parentBlockId varchar(100) default null, 
        url varchar(255) default null,
        method varchar(10) default null
    );
    alter table rs_${projectId}_${scenarioName}_block add constraint pk_rs${projectId}${scenarioName}_id primary key (id);
    alter table rs_${projectId}_${scenarioName}_block add constraint fk_rs${projectId}${scenarioName}urlmehod_rs${owner}urlsurlmethond foreign key rs_${projectId}_${scenarioName}_block(url,method) references rs_${owner}_urls(url,method);
    `;
    Database.query(sql, (row) => {
        // res.send(row);
        sql = `delete from rs_${projectId}_${scenarioName}_block`;
        Database.query(sql, (row) => {
            for (let atom of req.body.data) {
                // res.send(atom)
                if (atom.type === 'group' || atom.type === 'case') {
                    sql = `insert into rs_${projectId}_${scenarioName}_block(type,name,id,parentBlockId) values(?,?,?,?)`;
                    Database.query(sql, [
                        atom.type,
                        atom.name,
                        atom.id,
                        atom.parentBlockId
                    ], (row) => {

                    })
                } else if (atom.type === 'api') {
                    sql = `insert into rs_${projectId}_${scenarioName}_block(type,name,id,parentBlockId,url,method) values(?,?,?,?,?,?)`;
                    Database.query(sql, [
                        atom.type,
                        atom.url,
                        atom.id,
                        atom.parentBlockId,
                        atom.url,
                        atom.method
                    ], (row) => {

                    })
                }
            }
        });
        // Database.query()
        res.send(req.body.data);
    });
});

function dfs(jsonData) {
    console.log('START BFS');
    let returnJson = {};
    // dfs(jsonData['block']['statement'][''])
    console.log('END BFS');
    return returnJson
}

module.exports = router;