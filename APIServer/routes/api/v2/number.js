var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var randVal = Math.random()*50 + 1;
    var randVal2 = Math.random()*50 + 1;
    var randVal3 = Math.random()*50 + 1;
    var randVal4 = Math.random()*50 + 1;
    var randVal5 = Math.random()*50 + 1;

    res.status(200).send({
        number: Math.round(randVal),
        number2: Math.round(randVal2),
        number3: Math.round(randVal3),
        number4: Math.round(randVal4),
        number5: Math.round(randVal5)
    });
});

module.exports = router;
