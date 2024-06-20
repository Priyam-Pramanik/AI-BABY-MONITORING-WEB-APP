stats = "";
objects = [];


function preload(){
    alarm = loadSound('alarm.mp3');
    video = createCapture(VIDEO);
    video.size(740, 640);
    video.hide();
 
   
 }
function setup(){
    canvas = createCanvas(740, 640);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('model_status').innerHTML = "Status : Object is being detected.";

}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('model_status').innerHTML = "Status : Object is being detected.";
   
}

 
function modelLoaded(){
    console.log("Model Loaded!");
    stats = true;
    
    objectDetector.detect(video, gotResults);
}
function gotResults(error, results){
if(error){
    console.log(error);
}
    console.log(results);
    objects = results;
}
function draw(){

  
    image(video, 0, 0, 740, 640); 
    if (stats != ""){
       
        for(i= 0; i<objects.length; i++){
            document.getElementById("model_status").innerHTML = "Model Status = Object Detected.";
            fill('#FF0000');
            confidence = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + confidence + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label == 'person'){
                document.getElementById("status").innerHTML = "Baby Detected.";
                alarm.stop();
            } else{
                document.getElementById("status").innerHTML = "Baby Not Detected.";
                alarm.play();
              
            }
            
            
        }
       
      

    }   

    if(objects.length <= 0){
        document.getElementById("status").innerHTML = "Baby Not Detected.";
        alarm.play();
       
    }
}

function stop(){
    alarm.setVolume(0);
    console.log("Alarm Stopped.")
}
function reset(){
    alarm.setVolume(1);
    console.log("Alarm Reset.")
}