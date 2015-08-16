var app; // instance of server app
var isInitialized;

var db = require('../db');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var User = require('../models/User');

function initialize(app) {
  app.post('/users', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var result;
    console.log('saving ' + email + ' ' + password + ' into db');

    User.create({
      email: email,
      password: password
    }).then(function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).send('works');
      });
  })

  app.get('/users', function (req, res, next) {
    var query = req.query;
    var defer;
    if ('email' in query) {
      defer = User.findByEmail(query.email);
    } else {
      defer = User.findAll()
    }
    defer
      .then(function(err, users) {
        if (err) {
          return next(err);
        }
        console.log(users);
        resObj = {'users': users};
        res.status(200).send(resObj);
      });
  });
}

module.exports = {
  initialize: initialize,

  // get: function() {
  //   isInitialized && get();
  // },
  //
  // post: function() {
  //   isInitialized && post();
  // }
};
