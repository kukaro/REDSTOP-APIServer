var mysql = require('mysql');
const conf = require('../conf');

var connection = mysql.createConnection(conf);

connection.connect();

this.selectOne = (id,  callback) => {
    var sql = 'select * from rs_project where owner = ?';
    connection.query(sql, [id], (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};
