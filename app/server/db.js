// db implementation
// check db file existense, if not create one
var fs = require('fs'),
    path = require('path'),
    baseDir = path.normalize(__dirname + "/.."),
    file = baseDir + '/' + 'formsubmit.db';
    exists = fs.existsSync(file),
console.log('db file:' , file);

var sqlite3 = require("sqlite3").verbose();
// load file and create db
var db = new sqlite3.Database(file);

if (!exists) {
  console.log('db file doesn\'t exist, create one');
  fs.openSync(file, 'w');
  db.serialize(function () {
    console.log('db just created, add a table to it');
    db.run("CREATE TABLE user (id TEXT, email TEXT, password TEXT)", function (err) {
      if (!err) {
        console.log('create table success');
      } else {
        console.log(err);
      }
    });
  })
}

// db.close();
module.exports = db
