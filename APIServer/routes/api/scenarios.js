var express = require('express');
var router = express.Router();
var rsProject = require('../../model/rs-project');
var rsScenarios = require('../../model/rs-scenarios');

router.post('/:username', function (req, res, next) {
    var username = req.params.username;
    var json = {username};
    // console.log(username, password);
    rsProject.selectOne(username, (rows) => {
        let data = rows;
        console.log(data);
        rsScenarios.selectOne(data[0].id, (rows) => {
            console.log(rows);
            res.send(rows);
        });
    });
});

module.exports = router;
