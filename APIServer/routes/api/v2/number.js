var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var randVal = Math.random()*50 + 1;

    res.status(200).send({
        number: Math.round(randVal)
    });
});

module.exports = router;
