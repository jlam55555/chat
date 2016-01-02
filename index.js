var app = require('express')();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.broadcast.emit("newuser");
  socket.on("message", function(message) {
    io.emit("message", message);
  });
});

http.listen((process.env.PORT || 5000), function() {
  console.log("Listening...");
});
