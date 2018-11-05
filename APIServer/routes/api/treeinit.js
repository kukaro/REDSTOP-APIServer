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
    //res.status(200).send({msg:"ok"});
    getConnection().then(function (connection) {
        let query = "SELECT url,method,name FROM mydb.rs_kukaro_urls";
       // let insertQuery = 'insert into rs_kukaro_urls set ?';
        let data = {
            project_id : 2,
            url : req.query.url,
            method : req.query.method,
            name : "SearchItems"
        };

        connection.query(query, (err,data) => {
            if (err) {
                res.status(500).send({
                    stat: "fail",
                    msg: "query error"
                });
                connection.release();
            } else {

                res.status(200).send({
                    stat: "success",
                    data: data
                });
                connection.release();
            }
        });
    }).catch(function (err) {
        res.status(500).send({ status : "error", error : err});
    });

});

module.exports = router;
