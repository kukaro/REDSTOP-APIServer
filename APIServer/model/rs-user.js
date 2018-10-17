var mysql = require('mysql');
const conf = require('../conf');

var connection = mysql.createConnection(conf);

connection.connect();

this.selectOne = (id, pw, callback) => {
    var sql = 'select * from rs_user where username = ? and password = ?';
    connection.query(sql, [id, pw], (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};
