const express = require('express');
const router = express.Router();
const scenario = require('./scenario');
const number = require('./number');
const createFile = require('./create-file');

router.use('/scenario',scenario);
router.use('/number',number);
router.use('/file',createFile);


module.exports = router;
