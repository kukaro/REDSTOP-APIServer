var express = require('express');
var router = express.Router();
// var rsUser = require('../../model/rs-user');
var Database = require('../../model/common');

router.get('/:username/:password', function (req, res, next) {
    var username = req.params.username;
    var password = req.params.password;
    var json = {username, password};
    // console.log(username, password);
    // rsUser.selectOne(username, password, (rows) => {
    var sql = 'select * from rs_user where username = ? and password = ?';
    let data = [
        username, password
    ];
    Database.query(sql, data, (rows) => {
        if (rows.length == 0) {
            json['success'] = false;
        } else {
            json['success'] = true;
        }

        console.log(json);
        res.send(json);
    });
});

module.exports = router;
