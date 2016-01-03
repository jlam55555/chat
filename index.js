var app = require('express')();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

var clients = [];
var clientNicknames = [];
var clientColors = [];
var colors = [  // color scheme from http://www.colorschemer.com/schemes/viewscheme.php?id=8924
  "ffcccc", // light red
  "ffe0cc", // light red-orange
  "ffeacc", // light orange
  "fff4cc", // lighter orange
  "fffecc", // light yellow
  "effac8", // lighter green
  "c7f5c4", // light green
  "c4f0f4", // turquoise
  "c4daf4", // light blue
  "c9c4f4", // light indigo
  "e1c4f4", // light violet
  "f6c6e6"  // light pink
];
io.on("connection", function(socket) {
  socket.on("nickname", function(nick) {
    if(clientNicknames.indexOf(nick) > -1) {
      socket.emit("taken");
      return;
    }
    socket.broadcast.emit("newuser", nick);
    clients.push(socket);
    clientNicknames.push(nick);
    var color = colors[Math.floor(Math.random()*colors.length)];
    clientColors.push(color);
    io.emit("allNicknames", clientNicknames.toString());
    socket.emit("color", color);
  });
  socket.on("message", function(message, nickname) {
    var i = clients.indexOf(socket);
    socket.broadcast.emit("message", message, nickname, clientColors[i]);
    socket.emit("yourMessage", message);
  });
  socket.on("image", function(imageUrl, nickname) {
    var i = clients.indexOf(socket);
    socket.broadcast.emit("image", imageUrl, nickname, clientColors[i]);
    socket.emit("yourImage", imageUrl);
  });
  socket.on("disconnect", function() {
    var i = clients.indexOf(socket);
    if(clientNicknames[i] != null) {
      io.emit("disconnect", clientNicknames[i]);
      clients.splice(i, 1);
      clientNicknames.splice(i, 1);
      clientColors.splice(i, 1);
      io.emit("allNicknames", clientNicknames.toString());
    }
  });
});

http.listen((process.env.PORT || 5000), function() {
  console.log("Listening...");
});
