var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'easy88ch',
    database: 'mydb'
});

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
