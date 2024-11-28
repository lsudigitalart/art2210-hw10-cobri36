let particles = []; // Array to store the particles
let colors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"]; // Pastel colors

function setup() {
  createCanvas(800, 600);
  // Create 100 particles at random positions
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background('#0b0c22'); // Dark navy blue background to make the particles glow

  // Update and display each particle
  for (let particle of particles) {
    particle.update();
    particle.display();
  }
}

function mousePressed() {
  // Change particle behavior on mouse click
  for (let particle of particles) {
    particle.changeBehavior();
  }
}

function mouseMoved() {
  // Adjust particle speed or direction on mouse movement
  for (let particle of particles) {
    particle.changeSpeed();
  }
}

// Particle class to define each individual particle
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.size = random(5, 15);
    this.color = random(colors); // Assign a random pastel color to the particle
    this.speed = random(1, 3); // Set initial speed
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration

    // Particle bounces off edges
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.color);
    
    // Apply a soft glow effect using shadow
    drawingContext.shadowColor = this.color;
    drawingContext.shadowBlur = 20;
    
    ellipse(this.position.x, this.position.y, this.size);
  }

  changeBehavior() {
    // Randomly change color when clicked
    this.color = random(colors);
    // Randomly increase or decrease size
    this.size = random(5, 25);
  }

  changeSpeed() {
    // Change the speed based on mouse position
    this.velocity.setMag(map(mouseX, 0, width, 1, 5));
  }
}