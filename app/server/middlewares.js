function initialize(app) {
  var express = require('express');
  var bodyParser = require('body-parser');

  // set base path
  var path = require('path');
  var baseDir = path.normalize(path.join(__dirname, '../../public'));
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
  app.use(express.static(baseDir, config));

  app.use(function(req, res, next) {
    console.log('requested url: ' + req.originalUrl + ' ' + Date.now());
    next();
  }, function(req, res, next) {
    console.log('request method: ' + req.method);
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // use session
  app.use(session({ secrets: 'my secrets key' }));

  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send(err);
  });
}

module.exports = {
  initialize: initialize
};
