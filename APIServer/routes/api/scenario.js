var express = require('express');
var router = express.Router();
var rsProject = require('../../model/rs-project');
var rsScenarios = require('../../model/rs-scenarios');

router.get('/:username/:scenarioName', function (req, res, next) {
    var username = req.params.username;
    var json = {username};
    let scenarioName = req.params.scenarioName;
    // console.log(username, password);
    rsProject.selectOne(username, (rows) => {
        let data = rows;
        console.log(data);
        rsScenarios.selectOne(data[0].id, scenarioName, (rows) => {
            console.log(rows);
            res.send(rows[0]);
        });
    });
});

router.post('/:owner/:projectId/:scenarioName/:type/:iteratePeriod', function (req, res, next) {
    let data = req.params;
    console.log('scenario test')
    console.log(req.body.data)
    rsScenarios.insert(data.projectId, data.scenarioName, data.type, data.iteratePeriod, req.body.data, (rows) => {
        res.send(rows)
    })
});

router.post('/xml/:owner/:projectId/:scenarioName', function (req, res, next) {
    let data = req.params;
    console.log('yolo')
    console.log(data);
    console.log(req.body)
    rsScenarios.updateXml(data.projectId, data.scenarioName, req.body.xml, (rows) => {
        res.send(rows)
        console.log(rows)
    })
});

module.exports = router;
