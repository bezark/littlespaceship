let socket;
let stars = [];
let asteroids = [];
let planets = [];
let ship;
let canvas;
let paused = false;
let health = 100;

// TODO come up with strategy for creation of spaceMap and syncing between player instances.
let camera = {
  x: 0,
  y: 0,
};
let spaceMap = {
  width: 10000,
  height: 10000,
};
let numStars = spaceMap.width;
let numAsteroids = Math.floor(spaceMap.width / 1);
numAsteroids = 1;
let numPlanets = Math.floor(spaceMap.width / 100);

let myFont;
function preload() {
  // myFont = loadFont('/assets/EdgeOfTheGalaxyRegular-OVEa6.otf');
  myFont = loadFont('/assets/AstroSpace-0Wl3o.otf');
}

function setup() {
  textFont(myFont);
  canvas = createCanvas(800, 800);
  canvas.parent('sketch-container');
  socket = io.connect();
  console.log(socket);
  socket.on('msg', receiveMsg);
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  for (let i = 0; i < numAsteroids; i++) {
    asteroids.push(new Asteroid());
  }
  for (let i = 0; i < numPlanets; i++) {
    planets.push(new Planet());
  }
  ship = new Ship();
  asteroids[0].position.x = width / 2 + 200;
  asteroids[0].position.y = height / 2 - 1;
}
function draw() {
  background(0);

  if (!paused) {
    ship.move();
    ship.chargeSystems();
  }
  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
    if (stars[i].explode() == true) {
      stars.splice(i, 1);
    }
  }
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].show();
    if (asteroids[i].explode() == true) {
      asteroids.splice(i, 1);
    }
  }
  for (let i = 0; i < planets.length; i++) {
    planets[i].show();
    if (planets[i].explode() == true) {
      planets.splice(i, 1);
    }
  }
  ship.draw();
  drawUI();
  dead();
  // console.log(asteroids[0].angleToShip(), ship.shieldRot);
  // console.log(
  //   asteroids[0].angleToShip(),
  //   asteroids[0].distanceToShip(),
  //   asteroids[0].onCourseForShip(),
  //   asteroids[0].position.x,
  //   asteroids[0].position.y
  // );
  strokeWeight(10);
  stroke(255);
  // line(
  //   width / 2,
  //   height / 2,
  //   asteroids[0].position.x - camera.x,
  //   asteroids[0].position.y - camera.y
  // );
  // console.log(asteroids[0].onCourseForShip());
  // asteroids[0].onCourseForShip();
  noStroke();
  if (asteroids[0] != undefined) {
    asteroids[0].position.x -= 1;
  }
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
  // if (camera.x < 0 || camera.x > spaceMap.width - width) {
  //   speed.x *= -1;
  // }
  // if (camera.y < 0 || camera.y > spaceMap.height - height) {
  //   speed.y *= -1;
  // }
  camera.x += speed.x;
  camera.y += speed.y;
}

function drawPositionText() {
  textAlign(CENTER, BOTTOM);
  fill(255);
  textSize(20);
  noStroke();
  text('x: ' + String(round(camera.x)), 100, 30);
  text(' y: ' + String(round(camera.y)), 250, 30);
  text(' shields: ' + round(ship.powerLevels.shields), 400, 30);
  text(' radar: ' + round(ship.powerLevels.radar), 550, 30);
  text(' thrust: ' + round(ship.powerLevels.thrust), 700, 30);
}

function drawUI() {
  drawShipPowerLevels(ship);
  drawHealthBar(health);
  drawPositionText();
  if (paused) {
    text('PAUSED', width / 2, height / 2 - 40);
  }
}

function dead() {
  if (health <= 0) {
    fill(0);
    rect(0, 0, width, height);
    noStroke();
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(100, 255, 255);

    text('OH NO!', width / 2, height / 2);
    textSize(25);
    text('Click to try again', width / 2, height / 2 + 30);
  }
  if (health <= 0 && mouseIsPressed) {
    health = 100;
    camera.x = 0;
    camera.y = 0;
  }
  textAlign(LEFT, BOTTOM);
}

function drawShipPowerLevels(ship) {
  // ship.powerLevels.shields;
  // ship.powerLevels.radar;
  // ship.powerLevels.thrust;
  strokeWeight(5);
  let columnWidth = 20;
  let columnHeight = 100;
  stroke(255);
  fill(0);
  rectMode(CORNER);
  // rect(width - columnWidth, 0, columnWidth, columnHeight);
  // rect(width - columnWidth * 2, 0, columnWidth, columnHeight);
  // rect(width - columnWidth * 3, 0, columnWidth, columnHeight);
}

function drawHealthBar(health) {
  rectMode(CORNER);
  noStroke();
  fill(0);
  rect(width / 4, 100, width / 2, 25);
  fill(
    health > 50
      ? color(0, 255, 0)
      : health > 25
      ? color(255, 150, 0)
      : color(255, 0, 0)
  );
  rect(width / 4, 100, map(health, 0, 100, 0, width / 2), 25);
  stroke(255);
  strokeWeight(5);
  fill(0, 0);
  rect(width / 4, 100, width / 2, 25);
  strokeWeight(2);
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === 27) {
    paused = !paused;
  }
}
