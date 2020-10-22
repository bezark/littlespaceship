let socket;
let stars = [];
let numStars = 10000;
let canvas;
let camera = {
  x: 0,
  y: 0,
  width: 10000,
  height: 10000,
};
let speed = {
  x: 3.5,
  y: 0.34,
};
let xBox;
let yBox;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.parent('sketch-container');
  socket = io.connect();
  socket.on('msg', receiveMsg);
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}
function draw() {
  background(0);
  drawShip();
  moveShip();
  drawPositionText();
  for (let i = 0; i < stars.length; i++) {
    stars[i].show(camera.x, camera.y);
  }
}

function receiveMsg(data) {
  console.log(data);
}

function buttonClick(msg) {
  console.log('sending: ', msg.innerText);
  var data = {
    msg: msg.innerText,
  };
  socket.emit('msg', data);
}

function drawShip() {
  rectMode(CENTER);
  fill(255, 0, 0);
  rect(width / 2, height / 2, 20);
}

function moveShip() {
  if (camera.x < 0 || camera.x > camera.width - width) {
    speed.x *= -1;
  }
  if (camera.y < 0 || camera.y > camera.height - height) {
    speed.y *= -1;
  }
  camera.x += speed.x;
  camera.y += speed.y;
}

function drawPositionText() {
  fill(255);
  text(
    'x: ' + String(round(camera.x)) + ' y: ' + String(round(camera.y)),
    10,
    20
  );
}
