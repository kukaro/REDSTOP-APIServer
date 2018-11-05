const express = require('express');
const router = express.Router();
const apitest = require('./apitest');
// const totalapis = require('./totalapis');
const apiSignIn = require('./sigin-in');
const apiUrls = require('./urls');
const apiScenarios = require('./scenarios');
const avgtime = require('./avgTime');
const latency = require('./latency');
const error = require('./error');
const hooking = require('./hooking');
const treeinit = require('./treeinit');
const promise_test = require('./promise-test');
const imp = require('./import');

router.use('/apitest',apitest);
// router.use('/totalapis',totalapis);
router.use('/avgtime',avgtime);
router.use('/latency',latency);
router.use('/error',error);
router.use('/sign-in/', apiSignIn);
router.use('/urls/', apiUrls);
router.use('/scenarios', apiScenarios);
router.use('/hooking',hooking);
router.use('/treeinit',treeinit);
router.use('/promise-test',promise_test);
router.use('/import',imp);

router.get('/', (req, res) => {
    res.status(200).send({
        msg : "API routes"
    });
});

module.exports = router;

