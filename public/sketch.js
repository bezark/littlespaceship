let socket;
function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect();
  socket.on('msg', receiveMsg);
}
function draw() {
  background(255, 255, 0);
}

function receiveMsg(data) {
  console.log(data);
}

function buttonClick(msg) {
  var data = {
    msg: msg,
  };
  socket.emit('msg', msg);
}
