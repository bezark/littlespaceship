class Planet {
  constructor() {
    this.position = createVector(
      random(spaceMap.width),
      random(spaceMap.height)
    );
    this.countDown = 7;
    this.exploding = false;
    this.size = random(50, 200);
    this.color = color(
      random(255),
      random(255),
      map(this.size, 50, 200, 0, 255)
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
      ) <
      this.size / 2
    ) {
      this.exploding = true;
    }
    if (
      this.position.x - camera.x > 0 &&
      this.position.x - camera.x < width &&
      this.position.y - camera.y > 0 &&
      this.position.y - camera.y < height
    ) {
      if (!this.exploding) {
        fill(255);
        ellipse(this.position.x - camera.x), fill(this.color);
        ellipse(this.position.y - camera.y);
        ellipse(
          this.position.x - camera.x,
          this.position.y - camera.y,
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
