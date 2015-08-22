var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    // successRedirect: '/',
    // failureRedirect: '/login',
    // failuerFlash: true 
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/signup');
    });
  })(req, res, next);
});

module.exports = router;
