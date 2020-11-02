var express = require('express');
var app = express();
var http = require('http').createServer(app);


const options = {
  /* ... */
};

// Socket.io uses some sort of meetadata wrapper that makes it difficult for the arduino to talk to it. Got it working with a regular old ws though
// actually I only got it working on a local server 
//const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });
 
// wss.on('connection', function connection(ws) {
//   console.log("we got a connection!")
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });
 
//   ws.send('something');
// });


const io = require('socket.io')(http, options);
io.on('connection', socket => {
  console.log(socket.id);
});

// routes
app.use('/', express.static('public'));

http.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log('listening on *:3000');
});

io.sockets.on('connection', socket => {
  socket.on('msg', data => {
    console.log(data)
    socket.broadcast.emit('msg', data);
  });
});