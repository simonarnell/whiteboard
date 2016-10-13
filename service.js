var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/public'));
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var whiteboard = io.of('/whiteboard').on('connection', function(socket) {
  console.log('A new browser connected to the whiteboard channel')
  
  socket.on('draw', function(message) {
    console.log('Broadcasting draw message');
    whiteboard.emit('draw', message);
  });
  
  socket.on('clear', function(message) {
    console.log('Broadcasting clear message');
    whiteboard.emit('clear', message);
  });
});

server.listen(8080);