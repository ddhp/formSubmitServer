var express = require('express')
var path = require('path');
var app = express();
var server = require("http").createServer(app)
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var util = require('util');
var formidable = require('formidable')
var form = new formidable.IncomingForm();

app.post('/user', urlencodedParser, function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email, password);
  // save to db
  db.run('INSERT INTO "user" (email, password) VALUES ("' + email + '", "' + password + '")', function (err, r) {
    if (err) {
      res.status(500).send('stg wrong with db');
    } else {
      res.status(200).send('successful');
    }
  });
})

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


server.listen(3000);
console.log('app start listen to port 3000');

// set base path
baseDir = path.normalize(__dirname + "/..");
app.use(express.static(baseDir));

// db implementation
// check db file existense, if not create one
var fs = require('fs');
var file = baseDir + '/' + 'formsubmit.db';
console.log(file);
var exists = fs.existsSync(file);
console.log(exists);

if (!exists) {
  console.log('db file doesn\'t exist, create one');
  fs.openSync(file, 'w');
}

var sqlite3 = require("sqlite3").verbose();
// load file and create db
var db = new sqlite3.Database(file);

db.serialize(function () {
  if (!exists) {
    console.log('db just created, add a table to it');
    db.run("CREATE TABLE user (email TEXT, password TEXT)", function (err) {
      if (!err) {
        console.log('create table success');
      } else {
        console.log(err);
      }
    });

  }
})

// db.close();
