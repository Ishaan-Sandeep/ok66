prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZMHW97EGz/model.json" , modelLoaded)
Webcam.attach(camera);


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}
function modelLoaded() {
    console.log("Model is Loaded!")
    console.log('ml5 version:', ml5.version);
}
function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}
function gotResults(error,results) {
    if(error) {
        console.error(error);
    }
    if(results[0].label == "No Mask") {
        console.log(results)
        document.getElementById("update_emoji").innerHTML = "&#x26d4;"
        document.getElementById("status").innerHTML = "No Mask"
    }
    if(results[0].label == "Improper Mask" || results[0].label == "Proper Mask") {
        console.log(results)
        document.getElementById("update_emoji").innerHTML = "&#x1F637;"
        document.getElementById("status").innerHTML = "Mask"
    }
}




