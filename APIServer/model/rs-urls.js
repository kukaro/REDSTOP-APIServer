var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'root',
    database: 'mydb'
});

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