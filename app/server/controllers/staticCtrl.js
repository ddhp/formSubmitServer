var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

router.get('/signup', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Hey', message: 'Please login here!'});
});

module.exports = router;
