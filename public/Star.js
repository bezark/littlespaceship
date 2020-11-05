class Star {
  constructor() {
    this.x = random(spaceMap.width);
    this.y = random(spaceMap.height);
    this.countDown = 7;
    this.exploding = false;
    this.size = random(5, 10);
  }
  //FIXME congested and messy
  show() {
    fill(255);
    if (
      dist(width / 2, height / 2, this.x - camera.x, this.y - camera.y) < 20
    ) {
      this.exploding = true;
    }
    if (
      this.x - camera.x > 0 &&
      this.x - camera.x < width &&
      this.y - camera.y > 0 &&
      this.y - camera.y < height
    ) {
      if (!this.exploding) {
        ellipse(this.x - camera.x, this.y - camera.y, this.size);
      } else {
        fill(255, 0, 255);
        ellipse(this.x - camera.x, this.y - camera.y, this.size);
        this.countDown--;

        this.size *= 1.1;
      }
    }
  }
  explode() {
    if (this.countDown === 0) {
      return true;
    }
  }
}
