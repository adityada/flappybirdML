var bird;
var pipes = []
var birdDead = false;
var data = []
var hasDied = false;

function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe())
}

function draw() {
  background(0);
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    if (!birdDead) {
      pipes[i].update();
    }
    if(pipes[i].hits(bird) && !birdDead) {
      print("TEST!")
      birdDead = true;
      hasDied = true;
    }
    if(pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
    if(pipes[i+1] != undefined) {
      pipes[i].lineConnect(pipes[i+1])
      if(bird.x < pipes[i+1].x && bird.x > pipes[i].x && !birdDead) {
        bird.within(pipes[i], pipes[i+1])
      }
    }
  }
  
  bird.show();
  bird.update();

  if(frameCount % 80 == 0) {
    pipes.push(new Pipe())
  }


if(hasDied) {
  print("DEAD!")
  var urlData = "http://127.0.0.1:5000/data";
  var urlTarget = "http://127.0.0.1:5000/target";
  for(var i = 0; i < bird.data.length; i++) {
    for(var j = 0; j < bird.data[i][1].length; j++) {
      var http = new XMLHttpRequest();
      http.open("POST", urlTarget, true)
      http.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      http.send(JSON.stringify({"xCor": bird.data[i][1][j][0], 
                                "yCor": bird.data[i][1][j][1], 
                                "data_id": bird.data[i][1][j][2]}));
    }
    var http = new XMLHttpRequest();
    http.open("POST", urlData, true)
    http.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    http.send(JSON.stringify({"birdYPos": bird.data[i][0], "jump": bird.data[i][2]}));
  }
  hasDied = false;
}
  
}

function keyPressed() {
  // If space bar pressed
  if (key == ' ') {
    bird.jump = true;
    bird.up()
  }
}
