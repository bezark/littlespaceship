class Ship {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.color = 'red';
  }

  draw() {
    rectMode(CENTER);
    fill(this.color);
    rect(this.x, this.y, 20);
  }
  //TODO vectorfy everything
  move() {
    if (camera.x < 0 || camera.x > map.width - width) {
      speed.x *= -1;
    }
    if (camera.y < 0 || camera.y > map.height - height) {
      speed.y *= -1;
    }
    camera.x += speed.x;
    camera.y += speed.y;
  }
}
