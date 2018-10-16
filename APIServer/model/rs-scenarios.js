var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '52.79.40.146',
    post: 3306,
    user: 'root',
    password: '123redstop456',
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
