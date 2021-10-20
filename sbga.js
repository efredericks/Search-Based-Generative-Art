const s = ( idx ) => ( sketch ) => {

  class Particle {
    constructor(x,y) {
      this.position = sketch.createVector(x, y);
      this.velocity = sketch.createVector(sketch.random(-2,2), sketch.random(-2,2));
      this.color = sketch.color(255,0,255);
    }
    update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.x < 0 || this.position.x > sketch.width) this.velocity.x *= -1;
      if (this.position.y < 0 || this.position.y > sketch.height) this.velocity.y *= -1;
    }
    draw() {
      sketch.noStroke();
      sketch.fill(this.color);
      sketch.circle(this.position.x, this.position.y, 5);
    }
  }

  let particles;
  sketch.setup = () => {
    console.log(idx);
    sketch.createCanvas(500, 500);
    particles = [];
    for (let i = 0; i < sketch.random(10); i++)
      particles.push(new Particle(sketch.random(sketch.width), sketch.random(sketch.height)));
  };

  sketch.draw = () => {
    sketch.background(50);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
  };
};

let myp5_1 = new p5(s(1), document.getElementById('p5-sketch1'));
let myp5_2 = new p5(s(2), document.getElementById('p5-sketch2'));
let myp5_3 = new p5(s(3), document.getElementById('p5-sketch3'));