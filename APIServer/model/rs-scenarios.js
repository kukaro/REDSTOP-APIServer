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
    let data = [];
    if (iteratePeriod === 'default') {
        sql = `insert into rs_${projectId}_scenario(scenario_name,type,xml) 
        values(?,?,?)`;
        data = [scenarioName,type,xml];
    } else {
        sql = `insert into rs_${projectId}_scenario(scenario_name,type,iterate_period,xml)
        values(?,?,?,?)`;
        data = [scenarioName,type,iteratePeriod,xml];
    }
    connection.query(sql, data,(err, rows, field) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};
