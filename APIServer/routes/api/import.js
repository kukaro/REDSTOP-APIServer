var express = require('express');
var router = express.Router();
var RDBMS = require('../../model/common');
const axios = require('axios');

let baseurl = '';
function makeURL(baseurl) {
    // let url = 'http://' + baseurl + '/swagger-ui-init.js';
    let url = 'https://' + baseurl + '/swagger.json';
    return new Promise(function (resolve) {
        resolve(url);
    })
}
function getSwaggerJSON(url){
    return new Promise(function (resolve) {
        axios.get(url).then(function (response) {
           // console.log(response);
            resolve(response.data);
        })
    })
}
function parsingInfo1(rawdata){
    let baseInfo = {};

    baseInfo["host"] = rawdata.host;
    baseInfo["basePath"] = rawdata.basePath;
    baseInfo["paths"] = rawdata.paths;

    return new Promise(function (resolve) {
        resolve(baseInfo);
    })
}
function parsingInfo2(info) {
    baseurl = info["host"] + info["basePath"];
    let arr1 = Object.keys(info["paths"]); // url path 배열
    let apis = [];

    for(let i=0;i<arr1.length;i++){
        // console.log("------------" + i + "--------------");
        let temp = Object.keys(info["paths"][arr1[i]]);
        for(let j=0;j<temp.length;j++){
            // console.log("-@-@-@-@-@-" + j + "-@-@-@-@-");
            // console.log(temp[j]);
            apis.push({"url": arr1[i], "method": temp[j]});
        }
    }

    return new Promise(function (resolve) {
        resolve(apis);
    })

}
function insertData(apis){
    let insertQuery = 'insert into rs_kukaro_urls set ?';

    let data = [];
    for(let i=0;i<apis.length;i++){
        let minijson = {};
        minijson["project_id"] = 2;
        minijson["url"] = apis[i].url;
        minijson["method"] = apis[i].method;
        minijson["name"] = "default";

        data.push(minijson);
    }

    return new Promise(function(resolve, reject){
       // console.log(data);
        for(let i=0;i<data.length;i++){
            RDBMS.query(insertQuery, data[i], (rows) => {
                if (rows.length == 0) {
                    reject('There is no such user');
                }
            });
        }
        resolve('Success to insert data into DB');
    });
}

router.put('/', function (req, res) {
    let baseurl = req.body["swaggerURL"];

    makeURL(baseurl).then(function (url) {
        return getSwaggerJSON(url);
    }).then(function (rawdata) {
        return parsingInfo1(rawdata);
    }).then(function (result) {
        return parsingInfo2(result);
    }).then(function (result) {
        return insertData(result);
    }).then(function (msg) {
        res.status(201).send({
            success: true,
            msg : msg
        })
    }).catch(function (msg) {
        res.status(500).send({
            success: false,
            msg : msg
        })
    })
});

module.exports = router;

/**
 * @swagger
 * tags:
 * - name: TestBlock
 *   description: Block 구성에 필요한 API
 */

/**
 * @swagger
 * /import:
 *   put:
 *     tags:
 *     - "TestBlock"
 *     summary: Returns user info if success to sign in
 *     description: "로그인에 성공하면 유저의 정보를 리턴합니다"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "username"
 *       in: "path"
 *       description: "user의 이름"
 *       required: true
 *       type: "string"
 *     - name: "password"
 *       in: "path"
 *       description: "user의 비밀번호"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: "string"
 *             password:
 *               type: "string"
 *             success:
 *               type: "boolean"
 */
