var express = require('express');
var router = express.Router();
var User = require('../../models/User');

router.post('/users', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var result;
  console.log('saving ' + email + ' ' + password + ' into db');

  User.create({
    email: email,
    password: password
  }).then(function(user) {
      // it possiblely resolve with 400 condition
      if (typeof user === 'string') {
        return res.status(400).send(user);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).send('works');
      });
    })
    .fail(function(err) {
      return next(err);
    });
})

router.get('/users', function (req, res, next) {
  var query = req.query;
  var defer;
  if ('email' in query) {
    defer = User.findByEmail(query.email);
  } else {
    defer = User.findAll()
  }
  defer
    .then(function(users) {
      console.log(User.genResponses(users));
      resObj = {'users': User.genResponses(users)};
      res.status(200).send(resObj);
    })
    .fail(function(err) {
      next(err);
    });
});

module.exports = router;
