var express = require('express');
var router = express.Router();
var rsProject = require('../../model/rs-project');
var rsScenarios = require('../../model/rs-scenarios');

router.get('/:username', function (req, res, next) {
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

router.post('/:owner/:projectId/:scenarioName/:type/:iteratePeriod', function (req, res, next) {
    var data = req.params;
    console.log('scenario test')
    console.log(req.body)
    rsScenarios.insert(data.projectId,data.scenarioName,data.type,data.iteratePeriod,req.body.data,(rows)=>{
        res.send(rows)
        console.log(rows)
    })
});

module.exports = router;
