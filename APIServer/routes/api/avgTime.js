var express = require('express');
var Influx = require('influx');
const os = require('os');
var router = express.Router();
const conf = require('../conf/conf');

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
        // console.log(result[0].mean)
        json['avgtime']=result[0].mean
        res.status(200).send(json)
    }).catch(err => {
        res.status(500).send(err.stack)
    })

});

module.exports = router;
