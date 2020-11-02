class Ship {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.color = 'red';
    this.powerLevels = {
      shields: 0,
      radar: 0,
      thrust: 0,
    };
    this.systemToCharge = 'none';
    this.speed = createVector(4, 0);
    this.direction = 0;
  }

  draw() {
    rectMode(CENTER);
    fill(this.color);
    push();
    translate(width / 2, height / 2);
    rotate(this.speed.heading());
    triangle(
      this.x + 20,
      this.y,
      this.x - 20,
      this.y - 10,
      this.x - 20,
      this.y + 10
    );
    circle(this.x + 10, this.y, 5);
    pop();
  }
  //TODO vectorfy everything
  move() {
    // if (camera.x < 0 || camera.x > map.width - width) {
    //   this.speed.x *= -1;
    // }
    // if (camera.y < 0 || camera.y > map.height - height) {
    //   this.speed.y *= -1;
    // }
    camera.x += this.speed.x;
    camera.y += this.speed.y;
  }
  rotateShip(rotationRate) {
    // console.log(rotationRate);
    console.log('heading', this.speed.heading());
    this.speed = this.speed.rotate(rotationRate);
  }
  updatePowerLevels(data) {
    // console.log(this.powerLevels);
    if (data.type == 'mode') {
      this.systemToCharge = data.data;
      console.log(this.systemToCharge);
    }
    if (data.type == 'thrust') {
      this.rotateShip(data.data);
    }
  }
  chargeSystems() {
    if (this.systemToCharge != 'none') {
      this.powerLevels[this.systemToCharge] =
        this.powerLevels[this.systemToCharge] > 100
          ? 100
          : this.powerLevels[this.systemToCharge] + 0.01;
    }
    // console.log(this.powerLevels);
  }
}
