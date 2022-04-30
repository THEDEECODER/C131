leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
song = "";
scoreLWY = 0;
scoreRWY = 0;
vol = 0;
function preload(){
song = loadSound("music1.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);
}
function draw() {
    image(video, 0, 0, 600, 500);
    stroke("#E63946");
    fill("#E63946");
    if(scoreRWY > 0.2){
    circle(rightwristx, rightwristy, 20);
    if((rightwristy > 0) &&(rightwristy <= 100) ){
        document.getElementById("speed").innerHTML = "Speed : 0.5";
        song.rate(0.5);
    }
    if((rightwristy > 100) &&(rightwristy <= 200) ){
        document.getElementById("speed").innerHTML = "Speed : 1";
        song.rate(1);
    }
    if((rightwristy > 200) &&(rightwristy <= 300) ){
        document.getElementById("speed").innerHTML = "Speed : 1.5";
        song.rate(1.5);
    }
    if((rightwristy > 300) &&(rightwristy <= 400) ){
        document.getElementById("speed").innerHTML = "Speed : 2";
        song.rate(2);
    }
    if((rightwristy > 400) &&(rightwristy <= 500) ){
        document.getElementById("speed").innerHTML = "Speed : 2.5";
        song.rate(2.5);
    }
}
    if(scoreLWY > 0.2){
        circle(leftwristx, leftwristy, 20);
        LWY = Number(leftwristy);
        removedecimal = Math.floor(LWY);
        vol = removedecimal/500;
        console.log(vol);
        document.getElementById("volume").innerHTML ="volume" + vol;
    }

}
function play() {
    song.play();
    song.setVolume(vol);
}
function modelloaded(){
    console.log("posenet is initialized");
}
function gotposes(results){
    if( results.length > 0 ){
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("Left wrist x coordinates = "+leftwristx+ "Left wrist y coordinates = "+leftwristy);
        console.log("Right wrist x coordinates = "+rightwristx+ "Right wrist y coordinates = "+leftwristy);
        scoreLWY = results[0].pose.keypoints[9].score;
        console.log("Left Wrist score = "+scoreLWY);
        scoreRWY = results[0].pose.keypoints[10].score;
        console.log("Right Wrist score = "+scoreRWY);
    }
    
}