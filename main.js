status="";
video="";
objects="";

function preload(){

}
function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
video=createCapture(VIDEO);
video.size(500,400);
video.hide();
}
function draw(){
    image(video,0,0,500,400);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            fill("#798BD6");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15, objects[i].y+15 );
            noFill();
            stroke("#30137D");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label==testing){
                video.stop();
                document.getElementById("number_of_objects").innerHTML="object detected: "+objects[i].label;

                            }
                            else{
                                document.getElementById("status").innerHTML="object not detected: "+objects[i].label; 

                            }
        }

    }

}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Statut: Détection d'Objet";
    testing=document.getElementById("box_input").value;

    
}
function modelLoaded(){
    console.log("model Loaded");
    status=true;
    video.loop();
    video.speed(1.25);
    video.volume(0);

}

function gotResult(error, results){
    if(error){
        console.log(error);

    }
    else{
        console.log(results);
        objects=results;

    }
}