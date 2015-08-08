var app; // instance of server app
var isInitialized;

var db = require('../db');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();

function post() {
  app.post('/user', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log('saving ' + email + ' ' + password + ' into db');
    // save to db
    db.run('INSERT INTO "user" (email, password) VALUES ("' + email + '", "' + password + '")', function (err, r) {
      if (err) {
        res.status(500).send('stg wrong with db');
      } else {
        setTimeout(function () {
          res.status(200).send('successful');
        }, 1000);
      }
    });
  })
}

function get() {
  app.get('/user', function (req, res) {
    db.all('SELECT * FROM user', function (err, users) {
      if (err) {
        console.error(err);
      } else {
        console.log('users: ', users);
        resObj = {'users': users};
        res.status(200).send(resObj);
      }
    }) 
  })
}

module.exports = {
  initialize: function(aApp) {
    app = aApp;
    isInitialized = true;
    get.call();
    post.call();
  },

  // get: function() {
  //   isInitialized && get();
  // },
  //
  // post: function() {
  //   isInitialized && post();
  // }
};
