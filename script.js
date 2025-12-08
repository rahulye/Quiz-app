let questions = [];
let currentIndex = 0;
let score = 0;

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

  const currentQuestion = questions[currentIndex];
  nextElement.style.display = "none";
  nextElement.onclick = null; 
  
  questionElement.textContent = currentQuestion.question;
  optionsElement.textContent = "";

  currentQuestion.options.forEach( (option) => {
    const newButton = document.createElement("button");
    newButton.innerHTML = option.text;

    newButton.addEventListener( 'click' , () => {
      nextElement.style.display = "flex"; // visible the next btn
      nextElement.onclick = showNext;

      const allButtons = optionsElement.querySelectorAll("button");
      allButtons.forEach( (btn) => {
        btn.disabled = true;
      });

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

function shuffleQuestions( array ) {
  return array.sort( ()=> Math.random() - 0.5);
};