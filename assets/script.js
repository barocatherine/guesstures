var faceImageSources = ["confused_1", "happy_1", "happy_2", "happy_3", "happy_4", "happy_5", "happy_6", "happy_7", "happy_8", "mad_1", "mad_2", "mad_3", "sad_1", "sad_2", "sad_3", "sad_4", "sad_5", "sad_6", "surprised_1", "surprised_2"];
var pictureWrapper = document.getElementById("picture-wrapper");
var answerWrapper = document.getElementById("answer-wrapper");
var startQuiz = document.getElementById("start-quiz");
var questionNumber = 0;
var chosenFaces = [];

function faceChooser(){
    for(var i = 0; i <6; i++){
        var randomNumber = Math.floor((Math.random()*19)+1);
        console.log(randomNumber);
        var check = chosenFaces.includes(faceImageSources[randomNumber])
        if(check){
            randomNumber = Math.floor((Math.random()*19)+1);
            console.log("this is a new random number "+randomNumber)
        }
        chosenFaces.push(faceImageSources[randomNumber]);
        console.log(chosenFaces);
    }
}
faceChooser();
function displayQuiz(){
    pictureWrapper.innerHTML="";
    answerWrapper.innerHTML="";
    var picture = document.createElement("img");
    console.log(chosenFaces[questionNumber])
    picture.setAttribute("src", "./assets/img/"+chosenFaces[questionNumber]+".jpg");
    pictureWrapper.appendChild(picture);
    console.log(pictureWrapper)
    var nextButton = document.createElement("button")
    nextButton.setAttribute("type", "button");
    nextButton.innerHTML= "Next"
    answerWrapper.appendChild(nextButton);
    console.log(questionNumber);
    if(questionNumber >= 5){
        nextButton.onclick = function(){gameEnder()}
    }
    else{
        nextButton.onclick = function(){checkAnswer()}  
    }
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