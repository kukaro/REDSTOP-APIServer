var express = require('express');
var router = express.Router();
var rsUser = require('../../model/rs-user');

router.get('/:username/:password', function (req, res, next) {
    var username = req.params.username;
    var password = req.params.password;
    var json = {username, password};
    // console.log(username, password);
    rsUser.selectOne(username, password, (rows) => {
        console.log(rows)
        json['success'] = true;
        console.log(json);
        res.send(json);
    });
});

module.exports = router;
