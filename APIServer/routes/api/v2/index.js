const express = require('express');
const router = express.Router();
const scenario = require('./scenario');
const number = require('./number');

router.use('/scenario',scenario);
router.use('/number',number);


module.exports = router;
