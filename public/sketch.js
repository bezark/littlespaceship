let socket;
let stars = [];
let ship;
let canvas;
let camera = {
  x: 0,
  y: 0,
};
// TODO come up with strategy for creation of map and syncing between player instances.
let map = {
  width: 10000,
  height: 10000,
};
let numStars = map.width;
let speed = {
  x: 3.5,
  y: 0.34,
};

function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent('sketch-container');
  socket = io.connect();
  socket.on('msg', receiveMsg);
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  ship = new Ship();
}
function draw() {
  background(0);
  ship.draw();
  ship.move();
  drawPositionText();
  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
    if (stars[i].explode() == true) {
      stars.splice(i, 1);
    }
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

//TODO convert to vector based movement
function moveShip() {
  if (camera.x < 0 || camera.x > map.width - width) {
    speed.x *= -1;
  }
  if (camera.y < 0 || camera.y > map.height - height) {
    speed.y *= -1;
  }
  camera.x += speed.x;
  camera.y += speed.y;
}

function drawPositionText() {
  fill(255);
  textSize(20);
  text(
    'x: ' + String(round(camera.x)) + ' y: ' + String(round(camera.y)),
    10,
    20
  );
}
