var express = require('express');
var router = express.Router();
const pool = require('../../conf/dbPool');

router.get('/', function(req, res) {
    // console.log(req.query.method);
    // console.log(req.query.url);

    function getConnection() {
        return new Promise(function (resolve, reject) {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err);
                } else{
                    resolve(connection);
                }
            });
        });
    }
    getConnection().then(function (connection) {
        //let query = "SELECT count(*) as count FROM api where pid = ?";
        let insertQuery = 'insert into rs_kukaro_urls set ?';
        let data = {
            project_id : 2,
            url : req.query.url,
            method : req.query.method,
            name : "SearchItems"
        };

        connection.query(insertQuery,data, (err) => {
            if (err) {
                res.status(500).send({
                    stat: "fail",
                    msg: "query error"
                });
                connection.release();
            } else {

                res.status(201).send({
                    stat: "success"
                });
                connection.release();
            }
        });
    }).catch(function (err) {
        res.status(500).send({ status : "error", error : err});
    });

});

module.exports = router;
