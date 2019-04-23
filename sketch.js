let p1, p2; // paddle
let p1V, p2V; // paddle velocity
let ball, ballV; // ball velocity
let p1S, p2S; // paddle score

function setup() {

      createCanvas(600, 400);
      p1 = p2 = height / 2 - 50;

      p1V = p2V = 0;
      p1S = p2S = 0;

      ball = createVector(width / 2, height / 2);
      ballV = createVector(random(-1, 1), random(-1, 1));
      ballV.setMag(3);

      textAlign(CENTER);
      textSize(30);
      fill(255);
}

function draw() {

      background(51);

      // draw paddles
      rect(20, p1, 10, 100);
      rect(width - 30, p2, 10, 100);

      // draw ball
      ellipse(ball.x, ball.y, 20);

      // draw scoreboard
      text(p1S + " | " + p2S, width / 2, 50);

      // handle paddles
      handlePaddles();
      handleBall();
}


function handleBall() {


      ball.x += ballV.x;
      ball.y += ballV.y;

      // top and bottom collisions
      if (ball.y > height || ball.y < 0) {
            ballV.y *= -1;
      }

      // paddle collisions
      if (ball.x <= 30) {
            // out of bounds
            if (ball.x <= 10) {
                  p2S++;
                  reset();
                  return;
            }

            // right side
            if (ball.y > p1 && ball.y < p1 + 100) {
                  ballV.x *= -1;
                  ballV.mult(random(1, 1.1));
            }

      } else if (ball.x >= width - 30) {
            // out of bounds
            if (ball.x >= width - 10) {
                  p1S++;
                  reset();
                  return;
            }

            // left side
            if (ball.y > p2 && ball.y < p2 + 100) {
                  ballV.x *= -1;
                  ballV.mult(random(1, 1.1));
            }
      }

}

function reset() {
      ballV.setMag(3);
      ball = createVector(width / 2, height / 2);
}

function handlePaddles() {

      /* player one controls */
      if (keyIsDown(87)) {
            /* W move up */
            p1V -= 5;
      } else if (keyIsDown(83)) {
            /* S move down */
            p1V += 5;
      }

      /* player two controls */
      if (keyIsDown(UP_ARROW)) {
            /* W move up */
            p2V -= 5;
      } else if (keyIsDown(DOWN_ARROW)) {
            /* S move down */
            p2V += 5;
      }

      // friction
      p1V *= 0.4;
      p2V *= 0.4;

      p1 += p1V;
      p2 += p2V;

      // constrain paddles
      p1 = constrain(p1, 0, height - 100);
      p2 = constrain(p2, 0, height - 100);
}



