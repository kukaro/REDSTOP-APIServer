var express = require('express');
var router = express.Router();
var rsProject = require('../../model/rs-project');

router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    var json = {username};
    // console.log(username, password);
    rsProject.selectOne(username, (rows) => {
        let data = rows;
        console.log(data);
        res.send(rows);
    });
});

module.exports = router;
