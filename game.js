let gameOver = false;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let player = {
  x:400,
  y:450,
  size:30,
  speed:6
};

let enemies = [];
let score = 0;

let keys = {};

document.addEventListener("keydown", e=>{
  keys[e.key] = true;
});

document.addEventListener("keyup", e=>{
  keys[e.key] = false;
});

function spawnEnemy(){
  enemies.push({
    x:Math.random()*760,
    y:0,
    size:30,
    speed:2 + Math.random()*3
  });
}

setInterval(spawnEnemy,1000);

function update(){

  if(gameOver) return;

  if(keys["ArrowLeft"]) player.x -= player.speed;
  if(keys["ArrowRight"]) player.x += player.speed;

  enemies.forEach(enemy=>{
    enemy.y += enemy.speed;

    if(
      enemy.x < player.x + player.size &&
      enemy.x + enemy.size > player.x &&
      enemy.y < player.y + player.size &&
      enemy.y + enemy.size > player.y
    ){
      gameOver = true;

      setTimeout(()=>{
        alert("Game Over! Pisteet: "+score);
        location.reload();
      },10);
    }

    if(enemy.y > canvas.height){
      score++;
      document.getElementById("score").innerText = score;
    }

  });

}

function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="lime";
  ctx.fillRect(player.x,player.y,player.size,player.size);

  ctx.fillStyle="red";
  enemies.forEach(enemy=>{
    ctx.fillRect(enemy.x,enemy.y,enemy.size,enemy.size);
  });

}

function gameLoop(){

  update();
  draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();