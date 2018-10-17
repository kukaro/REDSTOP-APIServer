var mysql = require('mysql');
const conf = require('conf');

var connection = mysql.createConnection(conf);


connection.connect();

this.selectOne = (projectId, username, callback) => {
    var sql = 'select * from rs_' + username + '_urls where project_id = ?';
    connection.query(sql, [projectId], (err, rows, fields) => {
        if (!err) {
            callback(rows)
        } else {
            console.log(err)
        }
    })
};
