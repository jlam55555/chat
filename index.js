var express = require("express");
var app = express();

app.set("port", (process.env.PORT || 5000));
app.get('/', function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
