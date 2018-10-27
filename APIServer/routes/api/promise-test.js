var express = require('express');
var router = express.Router();
var RDBMS = require('../../model/common');

// 실제 개발할 때 있을 수 있는 시나리오
// 1. user 이름 있는지 체크하기
// 2. 그 user의 모든 project 불러오기

function verifyUser(username,password){
    var sql = 'select * from rs_user where username = ? and password = ?';
    let data = [
        username, password
    ];
    return new Promise(function(resolve, reject){
        RDBMS.query(sql, data, (rows) => {
            if (rows.length == 0) {
                reject('There is no such user');
            } else {
                resolve();
            }
        });
    });
}
function ShowProjects(username){
    var sql = 'select * from rs_project where owner = ?';
    let data = [
        username
    ];
    return new Promise(function(resolve, reject){
        RDBMS.query(sql, data, (rows) => {
            if (rows.length == 0) {
                reject('There is no project of this user');
            } else {
                resolve(rows);
            }
        });
    });
}

router.post('/', function(req, res) {
    var username = req.body.uid;
    var password = req.body.pw;

    verifyUser(username,password).then(function () {
        return ShowProjects(username);
    }).then(function (rows) {
        res.send({
            status : "Success",
            error : rows
        });
    })
        .catch(function (errorMsg) {
            res.send({
                status : "Error",
                error : errorMsg
            });
        });

});

module.exports = router;
