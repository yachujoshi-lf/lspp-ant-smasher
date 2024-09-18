const container = document.querySelector(".container");

let ants = [];
const ANT_COUNT = 10;

function getRandomDirection() {
  return {
    dx: Math.random() > 0.5 ? 1 : -1,
    dy: Math.random() > 0.5 ? 1 : -1,
  };
}

class Ant {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.dx = props.dx;
    this.dy = props.dy;
    this.speed = 1.2;
    this.height = 42;
    this.width = 42;
    this.element = this.init();

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  init() {
    const ant = document.createElement("div");
    ant.classList.add("ant");
    container.appendChild(ant);

    return ant;
  }

  move() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  isCollidingWithAnt(other) {
    return (
      this.x + this.width >= other.x &&
      this.x <= other.x + other.width &&
      this.y + this.height >= other.y &&
      this.y <= other.y + other.height
    );
  }

  isCollidingWithWall() {
    return (
      this.x + this.width > container.offsetWidth || // Right wall
      this.x < 0 || // Left wall
      this.y + this.height > container.offsetHeight || // Bottom wall
      this.y < 0 // Top wall
    );
  }

  changeDirection() {
    const { dx, dy } = getRandomDirection();

    this.dx = dx;
    this.dy = dy;
  }
}

for (let i = 0; i < ANT_COUNT; i++) {
  const { dx, dy } = getRandomDirection();

  const x = Math.floor(Math.random() * (container.offsetWidth - 42));
  const y = Math.floor(Math.random() * (container.offsetHeight - 42));

  ants.push(new Ant({ x, y, dx, dy }));
}

function update() {
  for (const ant of ants) {
    ant.move();

    for (const otherAnt of ants) {
      if (ant === otherAnt) {
        continue;
      }

      if (ant.isCollidingWithAnt(otherAnt)) {
        ant.changeDirection();
      }

      if (ant.isCollidingWithWall()) {
        ant.changeDirection();
      }
    }
  }
}

function animate() {
  update();

  requestAnimationFrame(animate);
}

for (const ant of ants) {
  ant.element.addEventListener("click", () => {
    ants = ants.filter((a) => a !== ant);
    ant.element.remove();
  });
}

animate();
