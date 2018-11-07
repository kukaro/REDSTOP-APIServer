var mysql = require('mysql');
const conf = require('../conf/conf');

var connection = mysql.createConnection(conf.mysqlConf);

connection.connect();

this.selectOne = (id, callback) => {
    var sql = 'select * from rs_project where owner = ?';
    connection.query(sql, [id], (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};

this.updateIsInit = (owner, isInit, callback) => {
    var sql = 'update rs_project set is_init=? where owner = ?';
    connection.query(sql, [isInit, owner], (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};