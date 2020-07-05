//Create variables here
var dog, dogIMG, happyDog, happyDogIMG, database, foodS, foodStock;

function preload(){
  //load images here
  dogIMG = loadImage("images/dogImg.png");

  happyDogIMG = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,1,1);
  dog.addImage(dogIMG);
  dog.scale = 0.5;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogIMG);
  }

  drawSprites();

  //add styles here

  textSize(20);
  fill("white");
  text("Press up arrow key to feed the dog milk",75,50);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  }else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

