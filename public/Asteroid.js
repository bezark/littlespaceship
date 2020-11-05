class Asteroid {
  constructor() {
    this.position = createVector(
      random(spaceMap.width),
      random(spaceMap.height)
    );
    this.countDown = 7;
    this.exploding = false;
    this.size = random(5, 50);
    this.color = color(
      map(this.size, 5, 50, 0, 255),
      map(this.size, 5, 50, 255, 0),
      255
    );
  }
  //FIXME congested and messy
  show() {
    if (
      dist(
        width / 2,
        height / 2,
        this.position.x - camera.x,
        this.position.y - camera.y
      ) < 20
    ) {
      this.exploding = true;
      health -= this.size / 10;
    }
    if (
      this.position.x - camera.x > 0 &&
      this.position.x - camera.x < width &&
      this.position.y - camera.y > 0 &&
      this.position.y - camera.y < height
    ) {
      if (!this.exploding) {
        fill(this.color);
        rect(
          this.position.x - camera.x,
          this.position.y - camera.y,
          this.size,
          this.size
        );
      } else {
        ellipse(
          this.position.x - camera.x,
          this.position.y - camera.y,
          this.size
        );
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
