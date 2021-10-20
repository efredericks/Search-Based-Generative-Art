// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const s = (idx) => (sketch) => {
  // https://www.colourlovers.com/palette/4837725/A_Long_Night
  let colors = [
    sketch.color("#CE449C"), 
    sketch.color("#FDDE12"), 
    sketch.color("#E2A00F"), 
    sketch.color("#6A0252"), 
    sketch.color("#000000")
  ];

  class Particle {
    constructor(x, y) {
      this.position = sketch.createVector(x, y);
      this.velocity = sketch.createVector(sketch.random(-2, 2), sketch.random(-2, 2));
      this.color = colors[getRandomInt(0,colors.length)]; //sketch.color(255, 0, 255);
      this.life = sketch.random(1000);
      this.diameter = sketch.random(10);
    }
    update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.x < 0 || this.position.x > sketch.width) this.velocity.x *= -1;
      if (this.position.y < 0 || this.position.y > sketch.height) this.velocity.y *= -1;

      this.life--;
      if (this.life <= 0) return false;
      return true;
    }
    draw() {
      sketch.noStroke();
      sketch.fill(this.color);
      sketch.circle(this.position.x, this.position.y, this.diameter);
    }
  }

  let particles;
  sketch.setup = () => {
    sketch.idx = idx;
    sketch.createCanvas(500, 500);
    particles = [];
    for (let i = 0; i < sketch.random(10); i++)
      particles.push(new Particle(sketch.random(sketch.width), sketch.random(sketch.height)));

    sketch.background(colors[getRandomInt(0,colors.length)]);
  };

  sketch.draw = () => {
    // sketch.background(50);
    for (let i = particles.length - 1; i >= 0; i--) {
      let r = particles[i].update();
      particles[i].draw();

      if (!r)
        particles.splice(i, 1);
    }

    if (particles.length === 0) {
      console.log(`Sketch ${sketch.idx} is done.`)
      sketch.noLoop();
    }

  };
};

let myp5_1 = new p5(s(1), document.getElementById('p5-sketch1'));
let myp5_2 = new p5(s(2), document.getElementById('p5-sketch2'));
let myp5_3 = new p5(s(3), document.getElementById('p5-sketch3'));