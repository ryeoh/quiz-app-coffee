'use strict';

let questionNumber = 0;
let score = 0;

// Generate structure/form for each question page
function generateQuestionForm(questionNumber, newQuestionNumber) {
  return `<div class="question">
    <legend>${STORE[questionNumber].question}</legend>
      <form>
        <fieldset>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
              <span>${STORE[questionNumber].answers[0]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
              <span>${STORE[questionNumber].answers[1]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
            <span>${STORE[questionNumber].answers[2]}</span>
          </label>
          <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
              <span>${STORE[questionNumber].answers[3]}</span>
          </label>
          <button type="submit" class="js-submitButton">Submit</button>
        </fieldset>
      </form>
  </div>`;
}

// questionTracker should incrementally increase by one
function updateQuestionNumber() {
  questionNumber++;
  $(".questionNumber").text(questionNumber);
}

// Generate first question page
  // at push of "test your knowledge" button to start quiz, first page with question 1, answer options, submit button
function startQuiz() {
  $(".js-startButton").click(function(event) {
    $(".js-quizStart").remove();
    $("main").html(generateQuestionForm(questionNumber));
    updateQuestionNumber();
  });
}

// compare the user-chosen answer to the right answer "correctAnswer"
function checkAnswer() {
  $("main").on("submit", "form", function(event) {
    event.preventDefault();
    let userAnswer = $("input:checked").val();
    // console.log(userAnswer);
    let correctAnswer = STORE[questionNumber-1].correctAnswer;
    // console.log(correctAnswer);
    if (userAnswer === correctAnswer) {
      generateCorrectFeedback();
      updateScore();
    } else {
      generateWrongFeedback();
    }
  });
}

// function checkAnswer() {
//   $(".js-submitButton").on("submit", function(event) {
//     event.preventDefault();
//     submittedAnswer();
//    const answer = $("input:checked").siblings("span");
//    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
//    console.log(answer);
//    if (answer === correctAnswer) {
//      generateCorrectFeedback();
//      updateScore();
//    }
//    else {
//      generateWrongFeedback();
//    }
//   });
//   console.log(`${STORE[questionNumber].correctAnswer}`);
// }

// based on if the answer chosen matches, triggers the generation of "correct" feedback page
function generateCorrectFeedback() {
  $("main").html(`<div class="correctFeedback">
    <img class="feedbackPicture" src="${STORE[questionNumber-1].img}" alt="${STORE[questionNumber-1].alt}"/>
    <h2>You got it right!</h2>
    <h3>The answer is "${STORE[questionNumber-1].correctAnswer}"</h3> 
    <p class="explanation">${STORE[questionNumber-1].explanation}</p>
    <button type="button" class="js-nextQuestion">Next</button>
    </div>`); 
}

// if answer is wrong/mismatched, triggers the generation of "wrong/correction" feedback page
function generateWrongFeedback() {
  $("main").html(`<div class="wrongFeedback">
    <img class="feedbackPicture" src="${STORE[questionNumber-1].img}" alt="${STORE[questionNumber-1].alt}"/>
    <h2>You got it wrong!</h2> 
    <h3>The correct answer is "${STORE[questionNumber-1].correctAnswer}"</h3> 
    <p class="explanation">${STORE[questionNumber-1].explanation}</p>
    <button type="button" class="js-nextQuestion">Next</button>
    </div>`); 
}

// scoreKeeper should incrementally change based on right/wrong answer
function updateScore() {
  score++;
  $(".score").text(score);
}

// Generate next question page at push of "nextQuestion" button
function generateNextQuestion() {
  $("main").on("click", ".js-nextQuestion", function(event) {
    if (questionNumber < 10) {
      $("main").html(generateQuestionForm(questionNumber));
    updateQuestionNumber();
    } else if (questionNumber = 10) {
      generateFinalResults();
    }
  });
}

// At end of quiz, have last results-feedback page with choice to restart quiz
  // restart quiz at press of "Restart Quiz" button on final question feedback page
function generateFinalResults() {
  if (score >= 5) {
    $("main").html(`<div class="quizEnd">
        <img class="feedbackPicture" src="https://images.unsplash.com/photo-1458819757519-7581bade511d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2104&q=80" alt="cup of coffee with milk in a cup and saucer"/>
        <h2>You definitely know your coffee!</h2>
        <p>You got ${score}/10!</p>
        <button type="button" class="restartButton">Restart Quiz</button>
      </div>`);
  } else if (score < 5) {
    $("main").html(`<div class="quizEnd">
        <img class="feedbackPicture" src="https://thumbs-prod.si-cdn.com/el6AtpeR_hyvJ79lUg0iq9Q11go=/800x600/filters:no_upscale()/https://public-media.si-cdn.com/filer/b7/02/b7029f9e-5d9b-45cd-8d4f-0291f42427ef/istock-464628026.jpg" alt="cup of tea with tea bag"/>
        <h2>You may want to stick with drinking tea...</h2>
        <p>You got ${score}/10!</p>
        <button type="button" class="restartButton">Restart Quiz</button>
      </div>`);
  }
}

function restartQuiz () {
  $("main").on("click", ".restartButton", function(event) {
    location.reload();
  });
}

// function to run all quiz functions
function runQuiz() {
  startQuiz();
  checkAnswer();
  generateNextQuestion();
  restartQuiz();
}

runQuiz();
