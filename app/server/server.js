// dependencies
var express = require('express')
var app = express();
var server = require("http").createServer(app)

app.set('views', './app/server/views');
app.set('view engine', 'jade');


require('./middlewares').initialize(app);
require('./controllers/staticCtrl').initialize(app);
require('./controllers/userCtrl').initialize(app);

server.listen(3000);
console.log('app start listen to port 3000');
