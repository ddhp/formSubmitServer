var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(username, password, done) {
  User.findByEmail(username).then(function(users) {
    if (!users || users.length === 0) {
      console.log('incorrect username');
      return done(null, false, {message: 'Incorrect username'});
    }
    var user = users[0];
    if (!user.validatePassword(password)) {
      return done(null, false, {message: 'Incorrect password'});
    }

    return done(null, user);
  }, function(err) {
    if (err) {
      return done(err);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(id);
  User.findById(id)
    .then(function(user) {
      done(null, user)
    })
    .fail(function(err) {
      done(err);
    });
});

function initialize(router) {
  router.use(passport.initialize());
  router.use(passport.session());
}

module.exports = {
  initialize: initialize
}
