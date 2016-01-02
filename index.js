var app = require('express')();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

var clients = [];
var clientNicknames = [];
io.on("connection", function(socket) {
  socket.on("nickname", function(nick) {
    socket.broadcast.emit("newuser", nick);
    clients.push(socket);
    clientNicknames.push(nick);
  });
  socket.on("message", function(message, nickname) {
    socket.broadcast.emit("message", message, nickname);
    socket.emit("yourMessage", message);
  });
  socket.on("disconnect", function() {
    var i = clients.indexOf(socket);
    io.emit("disconnect", clientNicknames[i]);
    clients.splice(i, 1);
    clientNicknames.splice(i, 1);
  });
});

http.listen((process.env.PORT || 5000), function() {
  console.log("Listening...");
});
