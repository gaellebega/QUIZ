const questions=[
  {
    question:"which is the largest animal in the world?",
    answers:[
      {text:"shark",correct:false},
      {text:"elephant",correct:false},
      {text:"mause",correct:false},
      {text:"cat",correct:false},
      {text:"Blue whale",correct:true},
    ]
  },
  {
    question:"which is the animal considered as the king of the jungle?",
    answers:[
      {text:"Tiger",correct:false},
      {text:"bear",correct:false},
      {text:"lion",correct:true},
      {text:"kangaroo",correct:false},
      {text:"mufasa",correct:false},
    ]
  },
  {
    question:"what do bees collect from the flowers?",
    answers:[
      {text:"water",correct:false},
      {text:"nectar",correct:true},
      {text:"pollen",correct:false},
      {text:"leaves",correct:false},
      {text:"steam",correct:false},
    ]
  },{
    question:"which is the purpose of the social media?",
    answers:[
      {text:"sleep better",correct:false},
      {text:"cook food",correct:false},
      {text:"repair computers",correct:false},
      {text:"connect and communicate",correct:true},
      {text:"scrolling",correct:false},
    ]
  }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  //thi will show the avalible question
  showQuestion();
}

function showQuestion(){
  resetState()
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer=>{
  const button = document.createElement("button");
  button.innerHTML  = answer.text;
  button.classList.add("btn");
  answerButtons.appendChild(button); 
  if (answer.correct){
button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);
});
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
//we need to call the startquiz function for displaying the output
function selectAnswer(e){
  const selectedBtn = e.target;
  //if the dataser is true it will the class name to the incorrect
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  //so that when we selct the wrong answer we have to highlight the right ones as well;
  Array.from(answerButtons.children).forEach(button => {
   if(button.dataset.correct === "true"){
    button.classList.add("correct");
  }
    button.disabled = true;
  });
  
  nextButton.style.display = "block";
}
function showScore(){
  resetState();
  //we are displaying the score int he question element
  questionElement.innerHTML=`your score ${score} out of ${questions.length}!`;
nextButton.innerHTML="Play Again";
nextButton.style.display=" block"
}
function handleNextButton(){
  //it will increase the index question by one and then when we clizk on the another it will also increase then by one again
  currentQuestionIndex++
  if(currentQuestionIndex < questions.length){
    showQuestion();
    //if there is no another question so it is going to show the score
  }else{
    showScore();

  }
}
//function for the next Button
nextButton.addEventListener("click",()=>{
  //if the index is less tan the number of the questions
  if(currentQuestionIndex < questions.length){
    handleNextButton();
    //if there is no question then it have to restart the quiz
    }else{
      startQuiz();
    }
})
startQuiz();