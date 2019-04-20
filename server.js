var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var maxSocket;
server.listen(4000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
  console.log("connection at "+socket.id);

  
  
  socket.on('hey', function (data) {
    console.log(data);
  });
  
  
  socket.on('maxask', function (data) {
    console.log(socket.id);
    console.log(data);
    socket.emit('answer', { hello: 'world' });
    maxSocket = socket.id;
    
  });
  
  
  socket.on('joinFromWeb', function(){
  console.log('joined');
  })
  
  socket.on('movin', function (data) {

    socket.broadcast.emit('data', data);
    //io.clients[maxSocket].send(data);
  });
  
 
  
    // Disconnect listener
    // socket.on('disconnect', function() {
    //     console.log('Client disconnected.');
    // });
});
console.log('serverlistening on 4000');