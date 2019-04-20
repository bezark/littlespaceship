var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// io.set('transports', [ 'websocket' ]);

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//  });

io.on('connection', function (socket){
   console.log('connection with '+socket.id);
//console.log(socket);
    io.sockets.emit('hello', 'hellomax');
 

  socket.on('test', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });

  
  
  socket.on('hey', function (from, msg) {
    console.log('MSG', from, ' saying ', msg);
  });
});

http.listen(4000, function () {
  console.log('listening on *:3000');
});