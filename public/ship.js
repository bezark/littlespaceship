class Ship {
  constructor() {
    this.position = createVector(0, 0);
    this.color = 'red';
    this.powerLevels = {
      shields: 0,
      radar: 0,
      thrust: 0,
    };
    this.systemToCharge = 'none';
    this.speed = createVector(4, 0);
    this.direction = 0;
    this.shieldRot = 0;
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
    stroke('teal');
    strokeWeight(4);
    noFill();
    arc(
      this.position.x,
      this.position.y,
      this.position.x + 80,
      this.position.y + 80,
      this.shieldRot,
      this.shieldRot + HALF_PI
    );
    //  console.log('drawing shield')
    pop();
  }

  //TODO vectorfy everything
  move() {
    // if (camera.x < 0 || camera.x > spaceMap.width - width) {
    //   this.speed.x *= -1;
    // }
    // if (camera.y < 0 || camera.y > spaceMap.height - height) {
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
    if (data.type == 'shield') {
      this.shieldRot = data.data;
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
