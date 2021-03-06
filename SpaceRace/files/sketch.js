let ship;
let ship2;
let rightComets = [];
let leftComets = [];
let numberOfComets = 15;
let minSpeed=0.5;
let maxSpeed = 2;
let shipSpeed = 2;

function setup() {
  createCanvas(600, 600);
  ship = new spaceShip(135,530,shipSpeed,0,135,500);
  ship2 = new spaceShip(width-165,530,shipSpeed,0,465,500);
  for(let i = 0; i <numberOfComets;i++){
      rightComets[i] = new comet(0, random(0,400), random(minSpeed,maxSpeed));
  }
  for(let i = 0; i <numberOfComets;i++){
      leftComets[i] = new comet(600, random(0,400), random(minSpeed,maxSpeed));
  }
}

function draw() {
  background(50);
  stroke(250);
  line(width/2,height,width/2,height-200);
  ship.showPoints();
  ship2.showPoints();
  ship.show();
  ship2.show();
  for(let i = 0; i <numberOfComets;i++){
    rightComets[i].rightMove();
  }
  for(let i = 0; i <numberOfComets;i++){
    leftComets[i].leftMove();
  }
  for(let i = 0; i <numberOfComets;i++){
    rightComets[i].show();
  }
   for(let i = 0; i <numberOfComets;i++){
     leftComets[i].show();
   }
  if(keyIsDown(UP_ARROW)){
    ship.move();
  }
  if(keyIsDown(DOWN_ARROW)){
    ship.moveDown();
  }
  if(keyIsDown(87)){
    ship2.move();
  }
  if(keyIsDown(83)){
    ship2.moveDown();
  }

  ship.barrier();
  ship2.barrier();
  ship.showPoints();


}

class comet{
  constructor(x ,y,s){
    this.x = x;
    this.y = y;
    this.s = s;
  }
  rightMove(){
    this.x +=this.s;
    if(this.x>width){
      this.x = 0;
      this.y = random(0,400);
      this.s = random(minSpeed,maxSpeed);
    }
  }
    leftMove(){
      this.x -=this.s;
      if(this.x<0){
        this.x = 600;
        this.y = random(0,400);
        this.s = random(minSpeed,maxSpeed);
      }

  }
  show(){
    fill(255);
    noStroke();
    ellipse(this.x,this.y,10,10);
  }
}
class spaceShip{
  constructor(x ,y,s,score,scoreX,scoreY){
    this.x = x;
    this.y = y;
    this.s = s;
    this.score = score;
    this.scoreX = scoreX;
    this.scoreY = scoreY;
  }

  barrier(){
    if(this.y>height-70){
      this.y=530;
    }
  }
  showPoints(){
    textSize(70);
    text(this.score,this.scoreX,this.scoreY);
    fill(255);
  }
  move(){
    this.y +=-this.s;
    if(this.y == 0){
      this.y =530;
      this.score +=1;
    }

  }
  moveDown(){
    this.y -=-this.s;
  }
  show(){
    fill(0);
    rect(this.x,this.y,30,70);
  }
}
