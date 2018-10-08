var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: 'root',
    database: 'mydb'
});

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