var app = require('express')();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen((process.env.PORT || 5000), function() {
  console.log("testing");
});

/*var server = app.listen((process.env.PORT || 5000), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});*/
