var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket){
   console.log('connection with '+socket.id);
// console.log(socket);
 

  socket.on('CH', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
      io.sockets.emit('hello', 'hellomax');
  });

  
  
  socket.on('hey', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });
});

http.listen(4000, function () {
  console.log('listening on *:3000');
});