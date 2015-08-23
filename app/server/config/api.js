var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

require('./session').initialize(router);
require('./passport').initialize(router);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = router;
