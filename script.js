let questions = [];
let currentIndex = 0;
let score = 0;
let timerID = null;

async function loadQuestions() {
  const request = await fetch('./questions.json');
  questions = await request.json();
  displayQuestions(currentIndex);
}
loadQuestions();

const questionElement = document.querySelector('.js-question');
const optionsElement = document.querySelector('.js-options');
const nextElement = document.querySelector('.js-next-btn');

function displayQuestions(currentIndex) {
  startTimer(7000);
  const currentQuestion = questions[currentIndex];
  nextElement.style.display = "none";
  nextElement.onclick = null; 
  questionElement.textContent = currentQuestion.question;
  optionsElement.textContent = "";
  
  currentQuestion.options.forEach( (option) => {
    const newButton = document.createElement("button");
    newButton.innerHTML = option.text;
    
    newButton.addEventListener( 'click' , () => {
      stopTimerBar();
      clearTimeout(timerID);
      nextElement.style.display = "flex"; // visible the next btn
      nextElement.onclick = showNext;
      const allButtons = diableBtn();
      if( option.result === true ) {
        newButton.style.backgroundColor = "green";
        newButton.style.color = "white";
        score++;
      } else {
        newButton.style.backgroundColor = "red";
        newButton.style.color = "white";
        currentQuestion.options.forEach( (op,index) => {  //also makes the correct answer green
          if( op.result === true) {
            allButtons[index].style.backgroundColor = "green";
            allButtons[index].style.color = "white";
          };
        });
      };
    });
    optionsElement.appendChild(newButton);
  });
};

function showNext() {
  currentIndex++;
  if( currentIndex < questions.length) {
    displayQuestions(currentIndex);
  } else {
    optionsElement.innerHTML = "";
    questionElement.innerHTML = `Your Score is ${score}/${questions.length}`; 
    nextElement.textContent = "Restart";

    nextElement.onclick = () => {
      score = 0;
      currentIndex = 0;
      nextElement.textContent = "Next";
      nextElement.style.display = "none";
      shuffleQuestions(questions);
      displayQuestions(0);
    };
  };
};

function diableBtn() {
  const allButtons = optionsElement.querySelectorAll("button");
  allButtons.forEach( (btn) => {
    btn.disabled = true;
  });
  return allButtons;
};

const bar = document.querySelector('.js-timer-bar');
function startTimer(duration) {
  bar.style.transition = "none";
  bar.style.transform = "scaleX(1)";
  bar.offsetWidth;

  bar.style.transition = `transform ${duration}ms linear`;
  bar.style.transform = "scaleX(0)";

  clearTimeout(timerID);
  timerID = setTimeout(() => {
    showNext();
  }, duration);

};

function stopTimerBar() {
  bar.style.transition = "none";
}

function shuffleQuestions( array ) {
  return array.sort( ()=> Math.random() - 0.5);
};
