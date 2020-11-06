class Ship {
  constructor() {
    this.position = createVector(0, 0);
    this.color = 'red';
    this.powerLevels = {
      shields: 50,
      radar: 25,
      thrust: 60,
    };
    this.systemToCharge = 'none';
    this.speed = createVector(0, 0);
    this.direction = 0;
    this.shieldRot = 2 * PI;
  }

  draw() {
    rectMode(CENTER);
    fill(this.color);
    push();
    translate(width / 2, height / 2);
    this.drawShield();
    rotate(this.speed.heading());
    triangle(
      this.position.x + 20,
      this.position.y,
      this.position.x - 20,
      this.position.y - 10,
      this.position.x - 20,
      this.position.y + 10
    );
    circle(this.x + 10, this.y, 5);
    pop();
  }

  drawShield() {
    push();
    strokeWeight(
      (1 / 10) * this.powerLevels.shields * 2 < 0
        ? 0
        : (1 / 10) * this.powerLevels.shields * 2
    );
    noFill();
    strokeCap(SQUARE);
    let g = map(this.powerLevels.shields, 0, 100, 0, 255);
    stroke(255 - g, 255, 0);
    arc(
      this.position.x,
      this.position.y,
      this.position.x + 160,
      this.position.y + 160,
      this.shieldRot - (1 / 4) * PI,
      this.shieldRot + (1 / 4) * PI
    );
    //  console.log('drawing shield')
    pop();
  }

  move() {
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
    if (data.type == 'shield') {
      this.shieldRot = data.data % (2 * PI);
    }
  }
  chargeSystems() {
    if (this.systemToCharge != 'none') {
      this.powerLevels[this.systemToCharge] =
        this.powerLevels[this.systemToCharge] > 100
          ? 100
          : this.powerLevels[this.systemToCharge] < 0
          ? 0
          : this.powerLevels[this.systemToCharge] + 0.1;
    }
    // console.log(this.powerLevels);
  }
}
