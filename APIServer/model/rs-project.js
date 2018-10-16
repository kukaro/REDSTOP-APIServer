var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'easy88ch',
    database: 'mydb'
});

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
