// dependencies
var express = require('express')
var app = express();
var server = require("http").createServer(app)

app.set('views', './app/server/views');
app.set('view engine', 'jade');

// require('./middlewares/general').initialize(app);

// general middlewares
app.use('/', require('./middlewares/general'));
require('./passport').initialize(app);

// static middlewares
app.use('/', require('./middlewares/static'));
app.use('/', require('./controllers/staticCtrl'));

// api middlewares
app.use('/api', require('./middlewares/api'));
app.use('/api', require('./controllers/userCtrl'));
app.use('/api', require('./controllers/loginCtrl'));

server.listen(3000);
console.log('app start listen to port 3000');
