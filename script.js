
console.log('hey');

async function loadQuestions() {
  const request = await fetch('./questions.json');
  const questions = await request.json();
  displayQuestions(questions);
}
loadQuestions();

const questionElement = document.querySelector('.js-question');
const optionsElement = document.querySelector('.js-options');

function displayQuestions(questions) {
  questionElement.innerHTML = questions.question;
  questions.options.forEach( (q) => {
    optionsElement.innerHTML = q.text;
  });
};