var mysql = require('mysql');
const conf = require('../conf/conf');

var connection = mysql.createConnection(conf.mysqlConf);

connection.connect();

this.selectOne = (project_id, scenarioName, callback) => {
    var sql = 'select * from rs_' + project_id + '_scenario where scenario_name = ?';
    connection.query(sql, [scenarioName], (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};

this.insert = (projectId, scenarioName, type, iteratePeriod, xml, callback) => {
    let sql = null;
    let data = [];
    if (iteratePeriod === 'default') {
        sql = `insert into rs_${projectId}_scenario(scenario_name,type,xml) 
        values(?,?,?)`;
        data = [scenarioName, type, xml];
    } else {
        sql = `insert into rs_${projectId}_scenario(scenario_name,type,iterate_period,xml)
        values(?,?,?,?)`;
        data = [scenarioName, type, iteratePeriod, xml];
    }
    connection.query(sql, data, (err, rows, field) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    });
};

this.updateXml = (projectId, scenarioName, xml, callback) => {
    let sql = `update rs_${projectId}_scenario set xml=? where scenario_name = ?`;
    connection.query(sql, [xml, scenarioName], (err, rows, field) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    });
};

// easy 추가
// 한 프로젝트에 있는 모든 시나리오 리턴
this.selectAll = (project_id, callback) => {
    var sql = 'select * from rs_' + project_id + '_scenario';
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};
