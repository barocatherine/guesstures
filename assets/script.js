var faceImageSources = ["confused_1", "happy_1", "happy_2", "happy_3", "happy_4", "happy_5", "happy_6", "happy_7", "happy_8",
 "mad_1", "mad_2", "mad_3", "sad_1", "sad_2", "sad_3", "sad_4", "surprised_1", "surprised_2", "neutral_1", "neutral_2", "neutral_3", "neutral_4", "neutral_5", "neutral_6", "neutral_7"];
var emotions = [
    {
        uppercase: "Anger",
        lowercase: "anger",
        value: ""
    },
    {
        uppercase: "Contempt",
        lowercase: "contempt",
        value: ""
    },
    {
        uppercase: "Disgust",
        lowercase: "disgust",
        value: ""
    },
    {
        uppercase: "Fear",
        lowercase: "fear",
        value: ""
    },
    {
        uppercase: "Happiness",
        lowercase: "happiness",
        value: ""
    },
    {
        uppercase: "Neutral",
        lowercase: "neutral",
        value: ""
    },
    {
        uppercase: "Sadness",
        lowercase: "sadness",
        value: ""
    },
    {
        uppercase: "Surprise",
        lowercase: "surprise",
        value: ""
    },
]
var largestEmotion = "";
var scoreWrapper = document.getElementById("score")
var pictureWrapper = document.getElementById("picture-wrapper");
var answerWrapper = document.getElementById("answer-wrapper");
var startQuiz = document.getElementById("start-quiz");
var questionNumber = 0;
var score = 0
var chosenFaces = [];
var highScores = [];
var highScoreButton = document.getElementById("highScore")
// this function creates a new array of different faces to use for the quiz
function faceChooser(){
    var sources = faceImageSources.slice();
    for(var i = 0; i <10; i++){
        var randomNumber = Math.floor((Math.random()*sources.length));
        console.log(randomNumber);
        chosenFaces.push(sources[randomNumber]);
        sources.splice(randomNumber, 1);
        console.log(chosenFaces);
    }
}
faceChooser();
//this function sends the image to the api to examine
function emotionChecker(){
    const subscriptionKey = '18cd594249f24e20872d594ad4f7af5c';
    var imageUrl = "https://nmisustin.github.io/guesstures/assets/img/"+chosenFaces[questionNumber]+".jpg"
    var newUrl = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion'
    fetch(newUrl,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'ocp-apim-subscription-key': subscriptionKey
        },
        body: JSON.stringify({url: imageUrl})
    }).then(function(response){
        response.json()
        .then(function(data){
            console.log(data);
            //this loop takes the data from the api and puts it into an array
            for(var i=0; i<emotions.length; i++){
                var select = emotions[i].lowercase;
                var value = data[0].faceAttributes.emotion[select];
                emotions[i].value= value;
            }
            // this finds the highest number in the returned data and stores the object that it's in
            largestEmotion = emotions.reduce(function(current, next){
                if(next.value>current.value){
                    return next
                }
                else{
                    return current
                }
            })
        })
    })
}
//this function displays the quiz
function displayQuiz(){
    if(questionNumber>9){
        quizEnder();
    }
    else{
        pictureWrapper.innerHTML="";
        answerWrapper.innerHTML="";
        scoreWrapper.innerHTML="";
        scoreWrapper.innerHTML=score;
        var picture = document.createElement("img");
        //this loop creates all the buttons for the different emotion options
        for(let i=0; i<emotions.length; i++){
            var emotion = document.createElement("button");
            emotion.setAttribute("type", "button");
            emotion.className = "button is-medium is-info is-one-fifth is-variable"; // "button is-large is-info" will make the big blue buttons in Bulma
            emotion.innerHTML = emotions[i].uppercase;
            emotion.onclick = function(){checkAnswer(emotions[i].lowercase)};
            answerWrapper.appendChild(emotion);
        }
        console.log(chosenFaces[questionNumber])
        picture.setAttribute("src", "./assets/img/"+chosenFaces[questionNumber]+".jpg");
        pictureWrapper.appendChild(picture);
        console.log(pictureWrapper)
        console.log(questionNumber)
        emotionChecker();
    }
    
}
//check answer and call next question
function checkAnswer(answer){
    if(largestEmotion.lowercase===answer){
        score++;
    }
    questionNumber++;
    displayQuiz();
}
//this fuction will retrieve scores
function getScores(){
    var highScore = localStorage.getItem("highScores");
    if(!highScore){
        return false;
    }
    highScores=JSON.parse(highScore);
}
//this will be called when the quiz is over
function quizEnder(){
    pictureWrapper.innerHTML="";
    answerWrapper.innerHTML="";
    scoreWrapper.innerHTML="";
    scoreWrapper.innerHTML=score;
    var endMessage = document.createElement("p");
    endMessage.innerHTML = "Congratulations you scored "+ score+"/10!";
    pictureWrapper.appendChild(endMessage);
    var highScore = score;
    getScores();
    highScores.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}
function displayScores(){
    pictureWrapper.innerHTML="";
    answerWrapper.innerHTML="";
    getScores();
    var orderedScores = [];
    for (var i=0; i<highScores.length; i++){
        orderedScores.push(i);
    }
    orderedScores.sort(function(a, b){
        return highScores[b] - highScores[a];
    })
    for (var i = 0 ; i < orderedScores.length; i++){
        var scoreDisplay = document.createElement("p");
        if (highScores.length - 1 === orderedScores[i]){
            scoreDisplay.setAttribute("class", "mostRecent");
        }
        scoreDisplay.innerHTML = highScores[orderedScores[i]];
        pictureWrapper.appendChild(scoreDisplay);
    }
}
startQuiz.onclick= function(){displayQuiz()}
highScoreButton.onclick = function(){displayScores()}