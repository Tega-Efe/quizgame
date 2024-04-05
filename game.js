const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
//  obtains a list using get element by classname and converts it into an array 

const loader = document.getElementById('loader');
const game = document.getElementById('game');

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

// initaiating the questions object count
let currentQuestion = {};

let acceptingAnswers = false;
// sets all options or choices to false until an answer has been chosen

let score = 0;
let questionCounter = 0;
// sets score and questions count to zero

let availableQuesions = [];
// creates an empty list for available questions

let questions = [];
fetch('https://opentdb.com/api.php?amount=50&category=14&difficulty=easy&type=multiple')
    .then((res) => {
        return res.json();
        // obtains the http response of a body and converts it to json
    })
    .then((loadedQuestions) => {
        // questions = loadedQuestions;
        // startGame();
        questions = loadedQuestions.results.map((loadedQuestion) => {
          // used to get the original question from the question bank
          //  of the trivia api and convert the questions into 
          //  the desired format of our initial questions

          const formattedQuestion = {
              question: loadedQuestion.question,
          };

          const answerChoices = [...loadedQuestion.incorrect_answers];
          
          // using the spread operator to bring out an array of the incorrect answer choices
          
          formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
          // gets a random index between 1 and 4 and next is to dcecide which of them is the correct answer
          
          answerChoices.splice(
              formattedQuestion.answer - 1,
              0,
              // adding the last 0 using splice instructs thst we are not to remove any element
              loadedQuestion.correct_answer
            // all the above should give answerchoices all the loaded answers and place the correct answer in a random position
          );

          // iterating through the answer chooces and getting a referrence to each choice and the index that it is at 
          answerChoices.forEach((choice, index) => {
              formattedQuestion['choice' + (index + 1)] = choice;
          });
          // iterate through the answerchoices and arrange them as choces 1-4 doing it dynamically

          return formattedQuestion;
      });
      startGame();
    })

    .catch((err) => {
        console.error(err);
        // display the error prompt in the console
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
// spread operator, (...) used to take each element as an array and insert into another array

  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // compares the question count to the number of available questions to dcide if there are still more quesions to be displayed
    
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("/end.html");
  }

  questionCounter++;
// increment by 1 when intitiated

  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  // to display the current count of question being answered
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // to make sure the shuffle does not bring out the same question twice

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    // decider for correct or incorrect questions

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};






// console.log(choices)
// console.log(classToApply);


 // const classToApply = 'inocrrect';
    // if (selectedAnswer == currentQuestion.answer) {
    //     classToApply = 'correct';
    // }