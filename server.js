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
  
  
  socket.on('maxjoin', function (data) {
    console.log(socket.id);
    console.log(data);
    socket.emit('your_id_is', socket.id);
    
    
  });
  
  
//   socket.on('joinFromWeb', function(){
//   console.log('joined');
    
//   socks = socks.concat(socket.id)
//    // bigData[socket.id] = null;
//    //  var numOkeys  = Object.keys(bigData).length
//     // console.log(numOkeys);
//     socket.broadcast.emit('numOkeys', socks.length);
//   })
  
  socket.on('to_maxhole', function (data) {
    // bigData[socket.id]= data
    console.log("broadcasting data:"+data);
    socket.broadcast.emit('from_maxhole', socks.indexOf(socket.id), data)
  });
  
 
  
    // Disconnect listener
 socket.on('disconnect', function() {
   
   var index = socks.indexOf(socket.id);
    if (index > -1) {
      socks.splice(index, 1);
    }
    socket.broadcast.emit('numOkeys', socks.length);
    });
});
console.log('serverlistening on 4000');