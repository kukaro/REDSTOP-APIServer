var express = require('express');
var router = express.Router();
var axios = require('axios');

// 테스트 결과 받아서 테스트 치고, 그 때의 결과 influxDB에 저장하고,
router.post('/', function (req, res) {
    console.log('일단 드러는 왔어');
    var url = req.body.url;
    var data = req.body["data"];
    var method = req.body["method"];
    var startTime = new Date().getTime()

    var result = {};

    // 테스트를 보낼 데이터를 받는다
    var testdata = {
        url: url,
        method: method,
        data: data
    };

    // 제3서비스에 테스트를 보낸다
    // 결과를 리턴한다.
    // status, time, size, data 이렇게 4개
    if (method === 'POST') {
        axios({
            method: 'post',
            url: url,
            data: data
        })
            .then(function(response) {
                var endTime = new Date().getTime()
                var responseTime = new Date().getTime() - startTime;
                result = {
                    startTime: startTime,
                    endTime: endTime,
                    status: response.status,
                    data: response.data,
                    time: responseTime,
                    size: response.headers['content-length']
                };
            })
            .then(function(){
                res.status(200).send({
                    msg : "테스트 성공!",
                    result : result
                });
            })
            .catch(function (error) {
                var endTime = new Date().getTime()
                var responseTime = new Date().getTime() - startTime;
                console.log('error로 넘어옴 ㅎㅎ');
                console.log(Object.keys(error.response));
                result = {
                    startTime: startTime,
                    endTime: endTime,
                    status: error.response.status,
                    data: null,
                    time: responseTime,
                    size: 0
                };
                res.status(error.response.status).send({
                    msg : "에러,",
                    result : result
                });
            });
    } else if (method === 'GET') {
        // axios.interceptors.response.use((response) => {
        //     return response;
        // }, function (error) {
        //     // Do something with response error
        //     console.log(error.response)
        //     if (error.response.status === 401) {
        //         console.log('unauthorized, logging out ...');
        //     }
        //     res.status(200).send({
        //         msg : "테스트 실패..."
        //     });
        //
        //     return Promise.reject(error.response);
        //
        // });

        axios.get(url)
            .then(function(response) {
                var endTime = new Date().getTime()
                var responseTime = new Date().getTime() - startTime;
                result = {
                    startTime: startTime,
                    endTime: endTime,
                    status: response.status,
                    data: response.data,
                    time: responseTime,
                    size: response.headers['content-length']
                };
            })
            .then(function(){
                res.status(200).send({
                    msg : "테스트 성공!",
                    result : result
                });
            })
            .catch(function (error) {
                var endTime = new Date().getTime()
                var responseTime = new Date().getTime() - startTime;
                console.log('error로 넘어옴 ㅎㅎ');
                console.log(Object.keys(error.response));
                result = {
                    startTime: startTime,
                    endTime: endTime,
                    status: error.response.status,
                    data: null,
                    time: responseTime,
                    size: 0
                };
                res.status(error.response.status).send({
                    msg : "에러,",
                    result : result
                });
            });
    }
    // res.status(200).send({
    //     msg : "테스트 성공!",
    //     result : result
    // });
});

module.exports = router;
