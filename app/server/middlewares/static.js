var express = require('express');
var router = express.Router();

// set base path
var path = require('path');
// __dirname is current file path
var baseDir = path.normalize(path.join(__dirname, '../../../public'));
var config = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};

router.use(express.static(baseDir, config));

module.exports = router;
