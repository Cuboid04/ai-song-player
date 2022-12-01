var leftWristY=0;
var rightWristY=0;
var leftWristX=0;
var rightWristX=0;
var song_harry="";
var song_peter="";
var scoreLeftWrist=0;
var scoreRightWrist=0;
function preload(){
    song_harry = loadSound("Harry Potter.mp3");
    song_peter = loadSound("Peter Pan.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);

}
function draw(){
    image(video, 0, 0, 600, 500);
    if(scoreLeftWrist > 0.2){
        fill("cyan");
        stroke("lime");
        circle(leftWristX, leftWristY, 20);
        var numberLeftWrist=number(leftWristY);
        remove_decimal=floor(numberLeftWrist);
        var player1=song_harry;
        song.play(song_harry);
        if(scoreLeftWrist < 0.2){
            song.stop(song_peter);
        }
    }
    if(scoreRightWrist>0.2){
        fill("yellow");
        stroke("#B0BF1A");
        circle(rightWristX, rightWristY, 20);
        var numberRightWrist=number(leftWristY);
        remove_decimal=floor(numberRightWrist);
        var player2=song_peter;
        song.play(song_peter);
        if(scoreRightWrist < 0.2){
            song.stop(song_harry);
        }
    }
}
function modelloaded(){
    console.log("posenet is loaded");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftwristX = "+leftWristX+" leftWristY = "+leftWristY);
        console.log("rightwristX = "+rightWristX+" rightWristY = "+rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+ scoreLeftWrist);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("right wrist score = "+ scoreRightWrist);
        }

}
