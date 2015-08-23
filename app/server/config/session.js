var session = require('express-session');

function useSession(router) {
  // use session
  router.use(session({ 
    secret: 'my secrets key',
    resave: false,
    saveUninitialized: true
  }));
}

module.exports = {
  initialize: useSession
};
