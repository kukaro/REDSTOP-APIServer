/**
 * @swagger
 * definitions:
 *   TestResult:
 *     type: object
 *     properties:
 *       time:
 *         type: string
 *         description: 테스트 실행 시간
 *       method:
 *         type: string
 *         description: HTTP 메소드
 *       name:
 *         type: string
 *         description: API이름
 *       platform:
 *         type: string
 *         description: 테스트 플랫폼(Web, Movile App...)
 *       region:
 *         type: string
 *         description: 테스트 지역
 *       responsetime:
 *         type: integer
 *         format: int64
 *         description: 응답시간
 *       status:
 *         type: string
 *         description: 응답 상태코드
 *       url:
 *         type: string
 *         description: 테스트 타겟 URL
 *
 */

/**
 * @swagger
 * /latency/{pid}:
 *   get:
 *     tags:
 *     - "Monitoring"
 *     summary: Returns APIs that have heavy latency
 *     description: "한 Project에서 응답시간 지연이 큰 API의 리스트를 리턴합니다"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "pid"
 *       in: "path"
 *       description: "Project ID"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/TestResult'
 *       500:
 *         description : Database Error
 */

var express = require('express');
var Influx = require('influx');
var router = express.Router();
const conf = require('../../conf/conf');

const influx = new Influx.InfluxDB(conf.influxConf);


router.get('/:pid', function(req, res) {
    var json = {};
    influx.getDatabaseNames()
        .then(names => {
            if (!names.includes('redstop')) { //만약에 없으면 디비 만들고
                return influx.createDatabase('redstop');
            }
            else{ //있으면 그냥 있는거에 connect하고
                console.log('Sucess!');
            }
        })
        .catch(err => {
            console.error(`Error creating Influx database!`);
        });
    //TODO 1이상인걸로 수정함
    influx.query(`
    select * from testresult where "responsetime">=1 and "status"=200 limit 5
  `).then(result => {
        // console.log(result[0].mean)
        // json['avgtime']=result[0].mean
        // console.log(result)
        res.json(result)
    }).catch(err => {
        res.status(500).send(err.stack)
    });
});

module.exports = router;
