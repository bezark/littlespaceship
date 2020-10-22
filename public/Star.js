class Star {
  constructor() {
    this.x = random(10000);
    this.y = random(10000);
  }
  show(camX, camY) {
    fill(255);
    if (
      this.x - camX > 0 &&
      this.x - camX < 400 &&
      this.y - camY > 0 &&
      this.y - camY < 400
    ) {
      ellipse(this.x - camX, this.y - camY, 10);
    }
  }
}
