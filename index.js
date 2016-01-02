/*var express = require("express");
var app = express();

app.set("port", 5000);

app.use(express.static(__dirname + "/index.html"));

app.get('/', function(request, response) {
  response.write("Hello, World!");
});*/

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen((process.env.PORT || 5000), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
