var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.canvas.width  = window.innerWidth;
context.canvas.height = window.innerHeight;

var spaceship =
{
    color: "black",
    width: 8,
    height: 22,
    position:
    {
        x: 600,
        y: 600
    },
    velocity:
    {
        x: 0,
        y: 0
    },
    angle: Math.PI / 2,
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
    crashed: false
}

var stars = [];
for (var i = 0; i < 500; i++) {
    stars[i] = {
      x: Math.random(),
      y: Math.random(),
      radius: Math.sqrt(Math.random() * 2),
      alpha: 1.0,
      decreasing: true,
      dRatio: Math.random() * 0.05
    };
}

function drawSpaceship()
{
    x1 = spaceship.position.x;
    y1 = spaceship.position.y;
    x2 = x1+10;
    y2 = y1;
    x3 = x1+5;
    y3 = y1-20;
    context.save();
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.strokeStyle = 'white';
    context.stroke();
    context.moveTo(x1, y1);
    context.lineTo(x1-5, y1+5);
    context.strokeStyle = 'white';
    context.stroke();
    context.moveTo(x2, y2);
    context.lineTo(x2+5, y2+5);
    context.strokeStyle = 'white';
    context.stroke();
    context.fillStyle = "white";
    context.fill();

    if(spaceship.engineOn)
    {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x1+5, (y1+20));
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    context.restore();
}
function rotateRight(x, y)
{
    context.save();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.translate(x,y);
    context.rotate(1*Math.PI/180 );  
    context.translate(-x,-y);
    drawSpaceship();

}

function rotateLeft(x, y)
{
    context.save();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.translate(x,y);
    context.rotate(-(1*Math.PI/180) );  
    context.translate(-x,-y);
    drawSpaceship();
 
}

function updateSpaceship()
{
    if(spaceship.rotatingRight)
    {
        spaceship.angle += Math.PI / 180
        rotateRight(spaceship.position.x+5, spaceship.position.y-5)
        

    }
    else if(spaceship.rotatingLeft)
    {
        spaceship.angle -= Math.PI / 180;
        rotateLeft(spaceship.position.x+5, spaceship.position.y-5)
    }

    if(spaceship.engineOn)
    {   spaceship.position.x += Math.cos(spaceship.angle);
        spaceship.position.y -= Math.sin(spaceship.angle);

    }
}

function drawStars() {
    context.save();
    context.fillStyle = "#111"
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      context.beginPath();
      context.arc(star.x * canvas.width, star.y * canvas.height, star.radius, 0, 2*Math.PI);
      context.closePath();
      context.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
      if (star.decreasing == true) {
        star.alpha -= star.dRatio;
        if (star.alpha < 0.1) star.decreasing = false;
      } else {
        star.alpha += star.dRatio;
        if (star.alpha > 0.95) star.decreasing = true;
      }
      context.fill();
    }
    context.restore();
}

function draw()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawSpaceship();
    updateSpaceship();
    requestAnimationFrame(draw);
}

function keyLetGo(event)
{
    switch(event.keyCode)
    {
        case 37:
            spaceship.rotatingLeft = false;
            break;
        case 39:
            spaceship.rotatingRight = false;
            break;
        case 38:
            spaceship.engineOn = false;
            break;
    }
}

document.addEventListener('keyup', keyLetGo);

function keyPressed(event)
{
    switch(event.keyCode)
    {
        case 37:
            spaceship.rotatingLeft = true;
            break;
        case 39:
            spaceship.rotatingRight = true;
            break;
        case 38:
            spaceship.engineOn = true;
            break;
    }
}

document.addEventListener('keydown', keyPressed);
draw();
