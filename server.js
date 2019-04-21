var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var maxSocket;
server.listen(4000);
// WARNING: app.listen(80) will NOT work here!
var bigData ={}
var socks=[]
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
    
   bigData[socket.id] = null;
    var numOkeys  = Object.keys(bigData).length
    console.log(numOkeys);
    socket.broadcast.emit('numOkeys', numOkeys);
    socks = socks.concat(socket.id)
  })
  
  socket.on('movin', function (data) {
    bigData[socket.id]= data
    console.log(bigData);
    socket.broadcast.emit('data', bigData);
    //io.clients[maxSocket].send(data);
var arrayA = [1, 2];
var arrayB = [3, 4];
var newArray = arrayA.concat(arrayB);
    socks.indexOf(socket.id)
  });
  
 
  
    // Disconnect listener
 socket.on('disconnect', function() {
        delete bigData[socket.id]
    });
});
console.log('serverlistening on 4000');