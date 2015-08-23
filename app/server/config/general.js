var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  console.log('requested url: ' + req.originalUrl + ' ' + Date.now());
  next();
}, function(req, res, next) {
  console.log('request method: ' + req.method);
  next();
});

router.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send(err);
});

module.exports = router;
