class Ball {
  constructor(posX, posY, color) {
    this.posX = posX;
    this.posY = posY;
    this.color = color;
    this.a = 0.1;
    this.t = 0.1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.posX, this.posY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  initialSpeed(speed, angle) {
    this.angle = (angle * Math.PI) / 180;
    this.vx = speed * Math.cos(this.angle);
    this.vy = speed * Math.sin(this.angle);
  }

  move(ctx) {
    this.x = this.x + this.vx * this.t + 0.5 * this.a * this.t * this.t;
    this.y = this.y + this.vy * this.t + 0.5 * this.a * this.t * this.t;
    this.vy = this.vy + this.a * this.t;

    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
function updateMove(ball, ctx) {
  ball.move(ctx);
  requestAnimationFrame(updateMove);
}

function calculateCarambola() {
  // Obtener los valores ingresados por el usuario
  let playerBallPosX = parseInt(
    document.getElementById("playerBallPosX").value
  );
  let playerBallPosY = parseInt(
    document.getElementById("playerBallPosY").value
  );
  let targetBall1PosX = parseInt(
    document.getElementById("targetBall1PosX").value
  );
  let targetBall1PosY = parseInt(
    document.getElementById("targetBall1PosY").value
  );
  let targetBall2PosX = parseInt(
    document.getElementById("targetBall2PosX").value
  );
  let targetBall2PosY = parseInt(
    document.getElementById("targetBall2PosY").value
  );
  // Calcular la distancia entre la bola del jugador y las bolas objetivo
  let dist1 = Math.sqrt(
    Math.pow(playerBallPosX - targetBall1PosX, 2) +
      Math.pow(playerBallPosY - targetBall1PosY, 2)
  );
  let dist2 = Math.sqrt(
    Math.pow(playerBallPosX - targetBall2PosX, 2) +
      Math.pow(playerBallPosY - targetBall2PosY, 2)
  );
  // Dibujar la bola del jugador y las bolas objetivo en el canvas

  // Limpiar el canvas
  let playerBall = new Ball(playerBallPosX, playerBallPosY, "red");
  let targetBall1 = new Ball(targetBall1PosX, targetBall1PosY, "green");
  let targetBall2 = new Ball(targetBall2PosX, targetBall2PosY, "blue");
  playerBall.draw(ctx, canvas);
  targetBall1.draw(ctx, canvas);
  targetBall2.draw(ctx, canvas);
}

function play() {
  let playerBallPosX = parseInt(
    document.getElementById("playerBallPosX").value
  );
  let playerBallPosY = parseInt(
    document.getElementById("playerBallPosY").value
  );
  let ball = new Ball(playerBallPosX, playerBallPosY, "red");
  let speed = parseInt(document.getElementById("speed").value);
  let angle = parseInt(document.getElementById("angle").value);

  ball.initialSpeed(speed, angle);

  updateMove(ball, ctx);
}
