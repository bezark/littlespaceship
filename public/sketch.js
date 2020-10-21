let socket;
function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect();
  socket.on('msg', receiveMsg);
}
function draw() {
  backgroun(255, 255, 0);
}

function receiveMsg(data) {
  console.log(data);
}

function sendTask(task) {
  var data = {
    task: task,
  };
  socket.emit('task', data);
}
