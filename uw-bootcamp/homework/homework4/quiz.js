// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImage = document.getElementById("qImage");
const choiceA = document.getElementById("A");
const choiceB= document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const timeGauge = document.getElementById("timeGauge");
const scoreDiv = document.getElementById("scoreContainer");
//question creation

let questions = [
    {
        question : "How many championships did Kobe Bryant win? ",
        imgSrc : "images/kobe-dunk.jpg",
        choiceA : "Five",
        choiceB : "Three",
        choiceC : "Zero",
        correct : "A"
    } ,{
        question : "How many MVP's did Kobe Bryant win? ",
        imgSrc : "images/kobe-scoring.jpg",
        choiceA : "Three",
        choiceB : "One",
        choiceC : "Four",
        correct : "B"
    } ,{
        question : "Who is the best basketball player of all time? ",
        imgSrc : "images/mamba-out.jpg",
        choiceA : "LeBron",
        choiceB : "Michael Jordan",
        choiceC : "Kobe",
        correct : "C"
    }
];

// create the question now

const lastQuestion = questions.length -1;
let runningQuestion = 0;
let count = 0;
const questionTime = 11;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let timer;
let score = 0;



// question functioner
function askQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question +"</p>";
    qImage.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz)

//start quiz
function startQuiz(){
    start.style.display = "none";
    askQuestion();
    quiz.style.display = "block";
    runProgress();
    runCounter();
    timer = setInterval(runCounter, 1000);
}
//progress 
function runProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

//counter
function runCounter(){
    if (count < questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count =0;

        answerIsWrong();
        if (runningQuestion < lastQuestion){
            runningQuestion++;
            askQuestion();
        }else{
            clearInterval(timer);
            scoreRender();
        }
    }

}

//check answer
function checkAnswer(answer){
    if (answer == questions[runningQuestion].correct){
        //answer is correct
        score++
        //change progress bar to green
        answerIsCorrect();
    }else{
        //answer is correct
        //change progress bar to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion){
        runningQuestion++;
        askQuestion();
    }else{
        clearInterval(timer);
        scoreRender();
    }
}

//answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "0f0";
}

//answer is wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "f00";
}
// score
function scoreRender(){
    scoreDiv.style.display = "block";
    //score display
    const scorePerCent = Math.round(100 * score/questions.length);
    scoreDiv.innerHTML += "<p>"+ scorePerCent + "%</p>";

}