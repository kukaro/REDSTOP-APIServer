var express = require('express');
var router = express.Router();
var rsUser = require('../../model/rs-user');

router.get('/:id/:pw', function (req, res, next) {
    var id = req.params.id;
    var pw = req.params.pw;
    var json = {id, pw};
    console.log(id,pw)
    rsUser.selectOne(id,pw,(rows)=>{
        console.log(rows);
        res.send(json);
    });
});

module.exports = router;
