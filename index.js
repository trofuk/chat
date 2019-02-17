var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  
  socket.broadcast.emit('chat message', 'User has connected to chat');
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function () {
    io.emit('chat message', 'User disconnected');
  });

  socket.on("sender", function (data) {
    // socket.emit("sender", data);
    socket.broadcast.emit("sender", data);
});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});