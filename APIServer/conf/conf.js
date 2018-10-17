//mysql db conf
var host = '52.79.40.146';
var port = 3306;
var user = 'root';
var password = '123redstop456';
var database = 'mydb';

var mysqlConf = {host, port, user, password, database};

//influx db conf
var database = 'redstop';
var host = '52.79.135.42';
var port = 8086;

var influxConf = {database, host, port};

//exports
module.exports = {mysqlConf, influxConf};
