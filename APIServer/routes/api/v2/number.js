var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res) {
    console.log('마이크 테스트');
    let url = 'http://52.79.221.114:3000/api/v1/send-scenario/kukaro/2/default';
    axios.get(url)
        .then(function(response) {
            console.log('response입니다.');
            console.log(Object.keys(response));
            console.log(response);
        })
        .catch(function (error) {
            console.log('error입니다.');
            console.log(error)
        });
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
