var faceImageSources = ["confused_1", "happy_1", "happy_2", "happy_3", "happy_4", "happy_5", "happy_6", "happy_7", "happy_8", "mad_1", "mad_2", "mad_3", "sad_1", "sad_2", "sad_3", "sad_4", "sad_5", "sad_6", "surprised_1", "surprised_2"];
var pictureWrapper = document.getElementById("picture-wrapper");
var answerWrapper = document.getElementById("answer-wrapper");
var startQuiz = document.getElementById("start-quiz");
var questionNumber = 0;
var chosenFaces = [];

function faceChooser(){
    var sources = faceImageSources.slice();
    for(var i = 0; i <6; i++){
        var randomNumber = Math.floor((Math.random()*sources.length));
        console.log(randomNumber);
        chosenFaces.push(sources[randomNumber]);
        sources.splice(randomNumber, 1);
        console.log(chosenFaces);
    }
}
faceChooser();
function emotionChecker(){
    fetch()
}
function displayQuiz(){
    pictureWrapper.innerHTML="";
    answerWrapper.innerHTML="";
    var picture = document.createElement("img");
    var anger = document.createElement("button");
    anger.setAttribute("value","anger");
    anger.setAttribute("type", "button");
    anger.innerHTML = "Anger";
    anger.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(anger);
    var contempt = document.createElement("button");
    contempt.setAttribute("value", "contempt");
    contempt.setAttribute("type", "button");
    contempt.innerHTML = "Contempt";
    contempt.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(contempt);
    var disgust = document.createElement("button");
    disgust.setAttribute("value", "disgust");
    disgust.setAttribute("type", "button");
    disgust.innerHTML = "Disgust";
    disgust.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(disgust);
    var fear = document.createElement("button");
    fear.setAttribute("value", "fear");
    fear.setAttribute("type", "button");
    fear.innerHTML = "Fear";
    fear.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(fear);
    var happiness = document.createElement("button");
    happiness.setAttribute("value", "happiness");
    happiness.setAttribute("type", "button");
    happiness.innerHTML = "Happiness";
    happiness.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(happiness);
    var neutral = document.createElement("button");
    neutral.setAttribute("value", "neutral");
    neutral.setAttribute("type", "button");
    neutral.innerHTML = "Neutral";
    neutral.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(neutral);
    var sadness = document.createElement("button");
    sadness.setAttribute("value", "sadness");
    sadness.setAttribute("type", "button");
    sadness.innerHTML = "Sadness";
    sadness.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(sadness);
    var surprise = document.createElement("button");
    surprise.setAttribute("value", "surprise");
    surprise.setAttribute("type", "button");
    surprise.innerHTML = "Surprise";
    surprise.onclick = function(){checkAnswer()};
    answerWrapper.appendChild(surprise);
    console.log(chosenFaces[questionNumber])
    picture.setAttribute("src", "./assets/img/"+chosenFaces[questionNumber]+".jpg");
    pictureWrapper.appendChild(picture);
    console.log(pictureWrapper)
}
//check answer and call next question
function checkAnswer(){
    questionNumber++;
    displayQuiz();
}
function gameEnder(){
    pictureWrapper.innerHTML="";
    answerWrapper.innerHTML="";
    var endMessage = document.createElement("p");
    endMessage.innerHTML = "The quiz is over"
    pictureWrapper.appendChild(endMessage);
}
startQuiz.addEventListener("click", displayQuiz)