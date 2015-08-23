// dependencies
var express = require('express')
var app = express();
var server = require("http").createServer(app)

app.set('views', './app/server/views');
app.set('view engine', 'jade');

// require('./middlewares/general').initialize(app);

// config general middlewares
app.use('/', require('./config/general'));

// config static middlewares
app.use('/public', require('./config/public'));

// config app middlewares
app.use('/', require('./config/app'));
app.use('/', require('./controllers/appCtrl'));

// api middlewares
app.use('/api', require('./config/api'));
app.use('/api', require('./controllers/api/userCtrl'));
app.use('/api', require('./controllers/api/loginCtrl'));

// // init passport session after all middlewares
// require('./passport').initialize(app);

server.listen(3000);
console.log('app start listen to port 3000');
