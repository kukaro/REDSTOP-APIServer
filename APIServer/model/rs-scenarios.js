var mysql = require('mysql');
const conf = require('../conf/conf');

var connection = mysql.createConnection(conf);

connection.connect();

this.selectOne = (project_id, callback) => {
    var sql = 'select * from rs_'+project_id+'_scenario';
    connection.query(sql, (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};
