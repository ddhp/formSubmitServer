var app;

function index() {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
  });
}

module.exports = {
  initialize: function(aApp) {
    app = aApp;
    index.call();
  }
}
