var mysql = require('mysql');
const conf = require('../conf/conf');

var connection = mysql.createConnection(conf.mysqlConf);

connection.connect();

this.query = (sql, data , callback) => {
    connection.query(sql, data, (err, rows, fields) => {
        if (!err) {
            callback(rows);
        } else {
            callback(err);
            console.log(err)
        }
    })
};
