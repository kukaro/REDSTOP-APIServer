var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var id = parseInt(req.params.id);
    var pw = parseInt(req.params.id);
    var json = {id, pw};
    res.send(json);
});

module.exports = router;
