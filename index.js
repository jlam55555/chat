var express = require("express");
var app = express();

app.set("port", 1234);

app.use(express.static(__dirname + "/index.html"));

app.get('/', function(request, response) {
  response.write("Hello, World!");
});
