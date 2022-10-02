const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var c="";
var gstate=0;
var engine, world, controls = true, tenseconds = false, moveaway = false, elevenseconds = 0;
var user, utriangle, triangle1, triangle2, triangle3, shady1background, line1, line2, lineimg, ground;
function preload(){
  utriangle = loadImage("triangle.png");
  shady1background = loadImage("white.webp");
  lineimg = loadImage("image.png");
}

function setup() {
  
c=17;
setInterval(()=>{
  c=c-1;
},1000)


 createCanvas(windowWidth,windowHeight);
 engine = Engine.create();
 world = engine.world;
  var options = {
    isStatic:true
  }


  triangle1 = createSprite(2000, 240, 30, 30);
  triangle2 = createSprite(1990, 300, 30, 30);
  triangle3 = createSprite(2020, 390, 30, 30);
  

  triangle1.addImage(utriangle);
  triangle2.addImage(utriangle);
  triangle3.addImage(utriangle);
  triangle1.scale = 0.4;
  triangle2.scale = 0.4;
  triangle3.scale = 0.4;

  user=Bodies.rectangle(width/2,800,50,50, options);
  //user = Bodies.polygon(windowWidth/2,800,3,40, options);
  World.add(world, user);
  ground = Bodies.rectangle(50, height-10, width, 100, options);
  World.add(world, ground);
  line2 = Bodies.rectangle(width/2, 0, 200, 10);
  World.add(world, line2);




  //times
  setTimeout(function(){
   tenseconds = true;
  },10000)
  setTimeout(function(){
    elevenseconds = 1;
   },12500)
   setTimeout(function(){
    elevenseconds = 2;
   },12600)
  setTimeout(function(){
    moveaway = true;
   },7000)
}






function draw() {


  if(elevenseconds == 0){
    background("white"); 
  }
  else{
    background("white");
    gstate=1;
    if(c<0){
      gstate=2;
    }
    //imageMode(CENTER)
    image(shady1background, 0, 0, windowWidth, windowHeight);
   }
   //display
  rectMode(CENTER);
  rect(ground.position.x,ground.position.y,15000,70);
  push();
  rectMode(CENTER);
  var angle = user.angle;
    translate(user.position.x, user.position.y);
    rotate(angle);
  rect(0, 0, 50, 50);
  pop();
  push();
    rectMode(CENTER);
    rect(line2.position.x, line2.position.y, 350, 10);
    pop();
  
  Engine.update(engine);
   

  //triangle 1 & 2 moves in from top right and stops after seconds
  if(tenseconds == false){
    triangle1.position.x -=5;
    triangle1.position.y +=1;
    triangle2.position.x -=5;
    triangle2.position.y +=1;
    triangle3.position.x -=5;
    triangle3.position.y +=1;
  }
  //after seconds user moves away into new slide
  if(moveaway == true){
    controls = false;
    Matter.Body.setPosition(user, {
      x:user.position.x - 6,
      y:user.position.y + 1
    })
  }
  //new slide
  if(elevenseconds == 1){
    moveaway = false;
    controls = true;
    triangle1.position.x = 2000;
    triangle2.position.x = 2000;
    triangle3.position.x = 2000;
    user.position.x = 600;
    user.position.y = 200;
    line2.position.x = 200;
    line2.position.y = 0;
    
    
    
  }
  
  //controls
  if(keyDown(UP_ARROW) && controls == true){
    Matter.Body.setPosition(user, {
      x:user.position.x,
      y:user.position.y - 5
    })
    
  }
  if(keyDown(DOWN_ARROW) && controls == true){
    Matter.Body.setPosition(user, {
      x:user.position.x,
      y:user.position.y + 5
    })
  }
  if(keyDown(RIGHT_ARROW) && controls == true){
    Matter.Body.setPosition(user, {
      x:user.position.x + 5,
      y:user.position.y
    })
  }
  if(keyDown(LEFT_ARROW) && controls == true){
    Matter.Body.setPosition(user, {
      x:user.position.x - 5,
      y:user.position.y
    })
  }


drawSprites();

push();
textSize(100);
if(gstate==1){
fill("red");
textFont("Georgia");
text(c, width/2, height/2 - 200);
}

pop();


}

function countDown(){
  setTimeout(function(){
    c = c -1;
   },1000)
  
}



//Things to do
//1. Line2 should collide with ground and stop
//2. User should not collide with the ground
//3. User should be able to move around the line  