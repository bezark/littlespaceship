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
  show() {
    if (this.distanceToShip() <= 80 + this.size / 2 && this.onCourseForShip()) {
      this.exploding = true;
    } else if (this.distanceToShip() < 20) {
      this.exploding = true;
      health -= this.size / 10;
    }
    if (this.distanceToShip() < 80 + this.size / 2) {
      // console.log(this.angleToShip(), ship.shieldRot);
    }
    rectMode(CENTER);
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
  distanceToShip() {
    let val = dist(
      width / 2,
      height / 2,
      this.position.x - camera.x,
      this.position.y - camera.y
    );
    return val;
  }
  angleToShip() {
    let angle = atan2(
      this.position.y - camera.y - width / 2,
      this.position.x - camera.x - height / 2
    );

    return (angle = angle < 0 ? TWO_PI + angle : angle);
  }
  onCourseForShip() {
    let angle = this.angleToShip();
    let v = angle;
    angle =
      ship.shieldRot > 1.75 * PI && angle < 1.5 * PI ? angle + TWO_PI : angle;
    if (
      angle >= ship.shieldRot - QUARTER_PI &&
      angle <= ship.shieldRot + QUARTER_PI
    ) {
      return true;
    } else {
      console.log(angle, v, ship.shieldRot);
      return false;
    }
  }
}
