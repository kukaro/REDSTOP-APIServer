var express = require('express');
var router = express.Router();
var rsUser = require('../../model/rs-user');
var rsProject = require('../../model/rs-project');
var rsUrls = require('../../model/rs-urls');

router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    var json = {username};
    // console.log(username, password);
    rsProject.selectOne(username, (rows) => {
        let data = rows;
        console.log('hihi');
        console.log(data);
        rsUrls.selectOne(data[0].id, data[0].owner, (rows) => {
            console.log(rows);
            res.send(rows);
        });
    });
});

module.exports = router;
