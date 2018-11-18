var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var randVal = Math.random()*50 + 1;
    var randVal2 = Math.random()*50 + 1;

    res.status(200).send({
        number: Math.round(randVal),
        number2: Math.round(randVal2)
    });
});

module.exports = router;
