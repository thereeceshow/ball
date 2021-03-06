// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const score = document.getElementById('score');

// function to generate random number

let ballNum = 50 //prompt('How many balls are in play?')

let scores = 0;

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  if ((this.y + this.size) >= height) {
    //this.velY = -(this.velY);
    this.y = 0 + this.size;
  }

  if ((this.y + this.size) <= 0) {
    //this.velY = -(this.velY);
    this.y = height - this.size;
  }

  this.x += this.velX;
  this.y += this.velY;

  score.textContent=(scores);
}


Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(240, 0, 0)';
        balls[j].color = this.size = this.size / 1.00001;
        scores++;
      }
    }
  }
}

let balls = [];

while (balls.length < ballNum) {
  let size = random(3, 7);
  let ball = new Ball(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7, 7),
    random(-7, 7),
    'rgb(0, 0, 240)',
    size
  );

  balls.push(ball);

}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i ++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();