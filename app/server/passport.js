var passport = require('passport');
var localStrategy = requrie('passport-local').Strategy;
var User = require('../models/User');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findByEmail(username).then(function(err, users) {
    if (err) {
      return done(err);
    }
    if (!users || users.length === 0) {
      return done(null, false, {message: 'Incorrect username'});
    }
    var user = users[0];
    if (!user.validatePassword(password)) {
      return done(null, false, {message: 'Incorrect password'});
    }

    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById()
    .then(function(user) {
      done(null, user)
    })
    .fail(function(err) {
      done(err);
    });
});

function initialize(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = {
  initialize: initialize
}
