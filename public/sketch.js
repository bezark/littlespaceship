let socket;
let stars = [];
let ship;
let canvas;
// TODO come up with strategy for creation of map and syncing between player instances.
let camera = {
  x: 0,
  y: 0,
};
let map = {
  width: 10000,
  height: 10000,
};
let numStars = map.width;

function setup() {
  canvas = createCanvas(800, 800);
  canvas.parent('sketch-container');
  socket = io.connect();
  console.log(socket);
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
  ship.chargeSystems();
  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
    if (stars[i].explode() == true) {
      stars.splice(i, 1);
    }
  }
  drawUI();
}

function receiveMsg(data) {
  // console.log(data);
  ship.updatePowerLevels(data);
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
    'x: ' +
      String(round(camera.x)) +
      ' y: ' +
      String(round(camera.y)) +
      ' shields: ' +
      round(ship.powerLevels.shields) +
      ' radar: ' +
      round(ship.powerLevels.radar) +
      ' thrust: ' +
      round(ship.powerLevels.thrust),
    10,
    20
  );
}

function drawUI() {
  drawShipPowerLevels(ship);
  drawPositionText();
}

function drawShipPowerLevels(ship) {
  // ship.powerLevels.shields;
  // ship.powerLevels.radar;
  // ship.powerLevels.thrust;
  let columnWidth = 20;
  let columnHeight = 100;
  stroke(255);
  fill(0);
  rectMode(CORNER);
  rect(width - columnWidth, 0, columnWidth, columnHeight);
  rect(width - columnWidth * 2, 0, columnWidth, columnHeight);
  rect(width - columnWidth * 3, 0, columnWidth, columnHeight);
}
