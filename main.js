status= "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
    audio = loadSound("alarm.mp3");
}

function start()
{
    console.log("start");
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 300);
    if(status != " ")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
            accuracy = results[i].confidence*100;
            label1 = results[i].label;
            x = results[i].x;
            y = results[i].y;
            w = results[i].width;
            h = results[i].height;
            rect(x, y, w, h);

            if(objects[i].label == "person")
            {
                audio.stop();
            }
            else
            {
                document.getElementById("stauts").innerHTML = "Baby Missing!";
                audio.play();
            }
        }
    }
}

function gotResults(results)
{
    objects = results;
}
