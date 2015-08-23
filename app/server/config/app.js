var express = require('express');
var router = express.Router();
var session = require('express-session');

require('./session').initialize(router);
require('./passport').initialize(router);

module.exports = router;
