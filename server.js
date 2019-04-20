var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(4000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function (socket) {
  console.log("connection at "+socket.id);
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
console.log('serverlistening on 4000');