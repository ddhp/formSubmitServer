var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  var name = req.user && req.user.name || '';
  res.render('index', { title: 'Hey', message: 'Hello there!', h3Message: 'Sign up to MyApp', name: name});
});

router.get('/signup', function (req, res) {
  res.render('signup', { title: 'Hey', message: 'Hello there!', h3Message: 'Sign up to MyApp'});
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Hey', message: 'Hello there!', h3Message: 'Login to MyApp'});
});

module.exports = router;
