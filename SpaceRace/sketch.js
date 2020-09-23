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
      rightComets[i] = new comet(random(-100,0), random(0,400), random(minSpeed,maxSpeed));
  }
  for(let i = 0; i <numberOfComets;i++){
      leftComets[i] = new comet(random(600,700), random(0,400), random(minSpeed,maxSpeed));
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
    if(RectCircleColliding(rightComets[i], ship)){
      ship.startAgain();
    }
    if(RectCircleColliding(rightComets[i], ship2)){
      ship2.startAgain();
    }
  }
   for(let i = 0; i <numberOfComets;i++){
     leftComets[i].show();
     if(RectCircleColliding(leftComets[i], ship)){
       ship.startAgain();
     }
     if(RectCircleColliding(leftComets[i], ship2)){
       ship2.startAgain();
     }
   }
  if(keyIsDown(UP_ARROW)){
    ship2.move();
  }
  if(keyIsDown(DOWN_ARROW)){
    ship2.moveDown();
  }
  if(keyIsDown(87)){
    ship.move();
  }
  if(keyIsDown(83)){
    ship.moveDown();
  }
  ship.barrier();
  ship2.barrier();
  ship.win();
  ship2.win();



}

function RectCircleColliding(comet, spaceShip) {
    let bRight = spaceShip.x + 30;
    let bLeft = spaceShip.x;
    let bTop = spaceShip.y;
    let bBottom = spaceShip.y + 70;

    if(comet.x + 10 > bLeft && comet.x - 10 < bRight && comet.y + 10 > bTop && comet.y - 10 < bBottom){
      return(true);
    }else{
      return false;
    }
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
  win(){
    if(this.score==3){
      console.log("win");
    }
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
  startAgain(){
    this.y=530;
  }
  moveDown(){
    this.y -=-this.s;
  }
  show(){
    fill(0);
    rect(this.x,this.y,30,70);
  }
}
