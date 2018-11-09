var express = require('express');
var router = express.Router();
var rsScenarios = require('../../../model/rs-scenarios');

router.get('/:pid', function (req, res) {
    let pid = req.params.pid;
    rsScenarios.selectAll(pid,(rows) => {
        // let data = rows;
        console.log(rows);
        res.status(200).send(rows);
        // rsScenarios.selectOne(data[0].id, scenarioName, (rows) => {
        //     console.log(rows);
        //     res.send(rows[0]);
        // });
    });
});

module.exports = router;

