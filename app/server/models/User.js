var q = require('q');
var db = require('../db');
var shortid = require('shortid');

module.exports = {
  create: function(data) {
    var defer = q.defer();
    var id = shortid.generate();
    var keyArr = ['id'];
    var valueArr = [id];
    var keyString;
    var valueString = '';
    var commandString;
    for (key in data) {
      keyArr.push(key);
      valueArr.push(data[key]);
    }
    keyString = keyArr.join(', ');
    valueString = Array.prototype.reduce.call(valueArr, function(valueString, str, idx) {
      valueString = valueString + '"' + str;
      if (idx < valueArr.length -1) {
        valueString += '", ';
      } else {
        valueString += '"';
      }
      return valueString;
    }, valueString);
    commandString = 'INSERT INTO "user" (' + keyString + ') VALUES (' + valueString + ')';
    db.run(commandString, function (err, r) {
      var res = {};
      if (err) {
        defer.resolve(err);
      } else {
        defer.resolve();
      }
    });
    return defer.promise;
  },

  findAll: function(cb) {
    var defer = q.defer();
    db.all('SELECT * FROM user', function (err, users) {
      if (err) {
        defer.resolve(err);
      } else {
        defer.resolve(null, users);
      }
    });
    return defer.promise;
  },

  findByEmail: function(email) {
    var defer = q.defer();
    var cmdString = 'SELECT * FROM user' + ' WHERE email="' + email + '"' ;
    console.log(cmdString);
    db.all(cmdString, function(err, users) {
      console.log(err, users);
      if (err) {
        defer.resolve(err);
      } else {
        defer.resolve(null, users);
      }
    });
    return defer.promise;
  }
}
