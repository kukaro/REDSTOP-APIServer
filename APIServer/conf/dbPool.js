const mysql = require('mysql');

const dbConfig = {
    host : '52.79.40.146',
    port : 3306,
    user : 'root',
    password : '123redstop456',
    database : 'mydb'
};

module.exports = mysql.createPool(dbConfig);
