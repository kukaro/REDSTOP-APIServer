/**
 * @swagger
 * tags:
 * - name: Monitoring
 *   description: API Monitoring에 관련된 API
 */

/**
 * @swagger
 * /avgtime/{pid}:
 *   get:
 *     tags:
 *     - "Monitoring"
 *     summary: Returns average response time
 *     description: "한 Project의 평균 응답 시간을 리턴합니다"
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
 *             avgtime:
 *               type: "number"
 *               format: "double"
 *       500:
 *         description : Database Error
 */

var express = require('express');
var Influx = require('influx');
var router = express.Router();
const conf = require('../../conf/conf');

const influx = new Influx.InfluxDB(conf.influxConf);

router.get('/:pid', function(req, res) {
    var json = {}
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
        })
    influx.query(`
    select MEAN("responsetime") from testresult
  `).then(result => {
        json['avgtime']=result[0].mean
        res.status(200).send(json)
    }).catch(err => {
        res.status(500).send(err.stack)
    })

});

module.exports = router;
