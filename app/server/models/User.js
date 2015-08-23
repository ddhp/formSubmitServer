var q = require('q');
var db = require('../db');
var shortid = require('shortid');
var moduleName = 'User';

// User class
function User(id, email, password) {
  // keys which would return as response
  var resKeys = ['id', 'email'];

  this.id = id;
  this.email = email;
  this.password = password;
  this.validatePassword = function(password) {
    if (password === this.password) {
      return true;
    }
    return false;
  };
  this.genResponse = function() {
    var res = {};
    var self = this;
    Array.prototype.forEach.call(resKeys, function(key) {
      res[key] = self[key];
    });
    return res;
  };
}

function createInstance(responses) {
  return Array.prototype.map.call(responses, function(res) {
    return new User(res.id, res.email, res.password);
  });
}

function log(moduleName, functionName, msg) {
  console.log(moduleName + '#' + functionName + ': ' + JSON.stringify(msg));
}

module.exports = {
  genResponses: function(users) {
    return Array.prototype.map.call(users, function(user) {
      return user.genResponse();
    });
  },

  // TODO: 
  //  - check if user is already created
  //  - md5 password
  //  - md5 email to be id
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
    log(moduleName, 'create', valueString);
    commandString = 'INSERT INTO "user" (' + keyString + ') VALUES (' + valueString + ')';
    db.run(commandString, function (err, r) {
      var res = {};
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve();
      }
    });
    return defer.promise;
  },

  findAll: function() {
    var defer = q.defer();
    var cmdString = 'SELECT * FROM user' ;
    log(moduleName, 'findAll', cmdString);
    db.all(cmdString, function (err, users) {
      users = createInstance(users);
      log(moduleName, 'findAll', users);
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(users);
      }
    });
    return defer.promise;
  },

  findById: function(id) {
    var defer = q.defer();
    var cmdString = 'SELECT * FROM user' + ' WHERE id="' + id + '"' ;
    log(moduleName, 'findById', cmdString);
    db.all(cmdString, function(err, users) {
      users = createInstance(users);
      log(moduleName, 'findById', users);
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(users);
      }
    });
    return defer.promise;
  },

  findByEmail: function(email) {
    var defer = q.defer();
    var cmdString = 'SELECT * FROM user' + ' WHERE email="' + email + '"' ;
    log(moduleName, 'findByEmail', cmdString);
    db.all(cmdString, function(err, users) {
      users = createInstance(users);
      log(moduleName, 'findByEmail', users);
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(users);
      }
    });
    return defer.promise;
  }
}
