var app = require('express')();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  alert("Hello, World!");
  console.log("Hello, World!");
  io.emit("newuser");
});

http.listen((process.env.PORT || 5000), function() {
  io.emit("status", "Listening on *:3000");
});
