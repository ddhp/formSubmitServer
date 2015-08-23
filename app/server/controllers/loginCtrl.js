var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    console.log(user);
    console.log(info);
    if (!user) {
      return next(err);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      console.log('loginuser');
      return res.status(200).send(user.genResponse());
    });
  })(req, res, next);
});

module.exports = router;
