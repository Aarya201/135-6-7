objectDetector = "";

img = "";
objects = [];
status = "";

function preload() {
    song=loadSound('fancy_like.mp3');
}

function setup() {
    canvas = createCanvas(640,420)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status  : Detecting Objects";
 
}


function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video,0,0,640,420);

    if(status != "")
      {
        r = random(255)    
        g = random(255)
        b = random(255)
        for (var i = 0; i<objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
          fill(r,g,b);
          percent = floor(objects[i].confidence *100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
          if(objects[i].label == document.getElementById("input1").value) {
            document.getElementById("baby").innerHTML = "It is there"
          }else {
            song.play()
          }
          
          noFill(); 
         stroke(255,0,0);
         rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height)
        }
    
      }
}