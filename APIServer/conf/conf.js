//mysql db conf
const host = '52.79.40.146';
const port = 3306;
const user = 'root';
const password = '123redstop456';
const database = 'mydb';

const mysqlConf = {host, port, user, password, database};

//influx db conf
const database = 'redstop';
const host = 'localhost';
const port = 8086;

const influxConf = {database, host, port};

//exports
module.exports = {mysqlConf, influxConf};