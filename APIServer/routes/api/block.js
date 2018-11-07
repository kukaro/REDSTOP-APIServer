var express = require('express');
var router = express.Router();

router.post('/:owner/:project-id/:scenario-name', function (req, res, next) {
    let test = req.params;
    res.send(test);
});

module.exports = router;
