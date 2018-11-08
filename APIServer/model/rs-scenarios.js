var mysql = require('mysql');
const conf = require('../conf/conf');

var connection = mysql.createConnection(conf.mysqlConf);

connection.connect();

this.selectOne = (project_id, callback) => {
    var sql = 'select * from rs_' + project_id + '_scenario';
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};

this.insert = (projectId, scenarioName, type, iteratePeriod, xml) => {
    let sql = null;
    if (iteratePeriod === 'default') {
        sql = `insert into rs_${projectId}_scenario(scenario_name,type,xml) 
        values(${scenarioName},${type},${xml})`;
    } else {
        sql = `insert into rs_${projectId}_scenario(scenario_name,type,iterate_period,xml)
        values(${scenarioName},${type},${iteratePeriod},${xml})`;
    }
    connection.query(sql, (err, rows, field) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};
