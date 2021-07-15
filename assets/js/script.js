// Quiz Questions and Answers //
var questions = [{
    
        title: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },

    {
        title: "Given the following code, what does the .appendChild() method do?",
        choices: ["The <h1> element will be added into the element with an ID attribute of main-body after any preexisting content", "The <h1> element will be added into the element with a ID attribute of main-body before any preexisting content", "The <h1> element will be added to the element with a class attribute of main-body after any preexisting content"],
        answer: "The <h1> element will be added into the element with an ID attribute of main-body after any preexisting content"
    },

    {
        title: "What is correct location to insert JavaScript?",
        choices: ["The <head> section", "The <body> section", "Does not matter as long as it's in the HTML"],
        answer: "The <body> section"
    },

    {
        title: "What tag is used to define an interactive field where users can enter data?",
        choices: ["<dialog>", "<datalist>", "<input>", "<enterpoint"],
        answer: "<input>"
    },

    {
        title: "What tag is used to define an image-or to add an image to an HTML page?",
        choices: [ "<img>", "<div>", "<meta>", "<table>"],
        answer: "<img>"
    },

    {
        title: "What is the format called that is used for storing and transporting data?",
        choices: ["HTML", "Font", "JSON", "Syntax"],
        answer: "JSON"
    },

    {
        title: "What the name of the statement used to exit or end a loop?",
        choices: [ "Break Statement", "Conditional Statement", "Close Statement", "Falter Statement"],
        answer: "Break Statement"
    },

    {
        title: "What JavaScript element is used to store multiple values in a single variable?",
        choices: ["Arrays", "Strings", "Variables", "Fuctions"],
        answer: "Arrays"
    },

    {
        title: "What does CSS stand for?",
        choices: ["Concpet Style Sheets", "Concave Style Sheets", "Curious Style Sheets", "Cascading Style Sheets"],
        answer: "Cascading Style Sheets"
    },

    {
        title: "What elements are used to test for TRUE or FALSE vaules stored in variables?",
        choices: ["Conditional Statements", "Trigger Readers", "Comparison and Logical Operators", "RegEXP or Regualar Expresstions"],
        answer: "Comparison and Logical Operators"
    },
];
// End of Quiz Questions and Answers//

// Main Variables//
const initialtimer = 180;
var highScoresArr = [];
var time = initialtimer;
var score = 0;
var qCount = 0;
var timeset;
var clock;
var viewHighSoreEl = document.querySelector("#info");
var timeEl = viewHighSoreEl.querySelector("#time");
var startEl = document.querySelector("#intro button");
var quizholderEl = document.querySelector("#quizHolder");
var questionHolderEl = document.querySelector("#questionHolder");
var highScoreHolder = document.querySelector("#highScoreHolder");
var recordsEl = document.querySelector("#records");
var answers = document.querySelectorAll("#questionHolder button");

// Hight Score Button//
var highscorebutton = function (event) {
  var targetEl = event.target;

  if (targetEl.matches("#scores")) {
    event.preventDefault();
    clearInterval(clock);
    timeEl.innerHTML = 0;
    time = initialtimer;
    score = 0;
    qCount = 0;
    displaysection("#highScores");
    resethtmlrecords();
  }
};

// Reset button//
var resetbutton = function () {
  time = initialtimer;
  score = 0;
  qCount = 0;
  removequestion();
  displaysection("#intro");
};

// Answer Question//
var answerquizbutton = function (e) {
  if (e.target.getAttribute("data-question") === questions[qCount].answer) {
    //CORRECT ANSWER//
    score++;
    qCount++;
    time = time + 3;
    updatequiz("Correct Answer");
  } else {
    //INCORRECT ANSWER//
    time = time - 15;
    qCount++;
    updatequiz("Wrong Answer");
  }
};

// Quiz Start//
var quizstartbutton = function () {
  setquestions();
  displaysection("#quizHolder");
  timeEl.innerHTML = initialtimer;
  clock = setInterval(myTimer, 1000);
};

// Quiz Update//
var updatequiz = function (answerCopy) {
  getelement("#scoreIndicator p").innerHTML = answerCopy;
  getelement("#scoreIndicator").classList.remove(
    "invisible",
    scoreIndicator()
  );

  answers = document.querySelectorAll("#questionHolder button");
  //Disable All Answer Buttons//
  for (var i = 0; i < answers.length; i++) {
    answers[i].classList.add("disable");
  }
  setTimeout(function () {
    if (qCount === questions.length) {
      displaysection("#finish");
      time = 0;
      getelement("#time").innerHTML = time;
    } else {
      //Remove Last Questions//
      removequestion();
      // Updates copy in questions with the net array's question text//
      setquestions();
      // Removed disabled status //
      Array.from(answers).forEach((answer) => {
        answer.classList.remove("disable");
      });
    }
  }, 1000);
};

// Record your Initials //
var recordbutton = function (e) {
  if (e.target.type == "submit") {
    var initialsRecord = getelement("#initials").value;
    if (initialsRecord === "") {
      getelement("#errorIndicator p").innerHTML =
        "You need at least 1 character";
      getelement("#errorIndicator").classList.remove(
        "invisible",
        errorIndicator()
      );
    } else if (initialsRecord.length > 5) {
      getelement("#errorIndicator p").innerHTML =
        "Maximum of 5 characters allowed.";
      getelement("#errorIndicator").classList.remove(
        "invisible",
        errorIndicator()
      );
    } else {
      //Sends value to current array for use now //
      highScoresArr.push({
        initials: initialsRecord,
        score: score,
      });
      //Sends value to local storage for later use //
      localStorage.setItem("highScores", JSON.stringify(highScoresArr));
      getelement("#highScores div").innerHTML = "";
      getelement("#score").innerHTML = "";
      displaysection("#highScores");
      resethtmlrecords();
      getelement("#initials").value = "";
    }
  }
};

// Clears highscores //
var clearscores = function () {
    highScoresArr = [];
    getelement("#highScores div").innerHTML = "";
    localStorage.removeItem("highScores");
};

// Display section on HTML //
var displaysection = function (element) {
  var thisElement = getelement(element);
  hidesection();
  thisElement.classList.remove("hide");
};

// Questions //
var setquestions = function () {
  var questionObj = questions[qCount];

  var qtitle = document.createElement("p");
  qtitle.textContent = questionObj.title;
  questionHolderEl.appendChild(qtitle);

  for (var j = 0; j < questionObj.choices.length; j++) {
    var qbutton = document.createElement("button");
    qbutton.textContent = questionObj.choices[j];
    qbutton.setAttribute("data-questionNum", qCount);
    qbutton.setAttribute("data-question", questionObj.choices[j]);
    questionHolderEl.appendChild(qbutton);
  }
};

// Remove a question //
var removequestion = function () {
  var ptitle = questionHolderEl.querySelector("p");
  if (ptitle) {
    var rmtitle = questionHolderEl.removeChild(ptitle);
    answers = document.querySelectorAll("#questionHolder button");
    for (var i = 0; i < answers.length; i++) {
      var throwaway = questionHolderEl.removeChild(answers[i]);
    }
  }

  getelement("#scoreIndicator").classList.add("invisible");
};

// Verify time to continue //
var myTimer = function () {
  if (time > 0) {
    time -= 1;
    timeEl.innerHTML = time;
  } else {
    clearInterval(clock);
    getelement("#score").innerHTML = score;
    displaysection("#finish");
  }
};

// Score Indicator //
var scoreIndicator = function () {
  clearTimeout(timeset);
  timeset =
    (function () {
      getelement("#scoreIndicator").classList.add("invisible");
    },
    1000);
};

// Get Element Section //
function getelement(x) {
  return document.querySelector(x);
}

// Hide HTML Section //
function hidesection() {
  var sections = document.querySelectorAll("section");
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.add("hide");
  }
}

// Load High Scores //
function loadHighScores() {
  var highScores = localStorage.getItem("highScores");
  if (!highScores) {
    highScoresArr = [];
    return false;
  }
  highScoresArr = JSON.parse(highScores);
}

// Reset HTML display for the score //
var resethtmlrecords = function () {
  highScoreHolder.innerHTML = "";
  highScoresArr.sort(function (a, b) {
    return b.score - a.score;
  });
  for (var i = 0; i < highScoresArr.length; i++) {
    var scores = document.createElement("div");
    scores.innerHTML =
      i + 1 + ". " + highScoresArr[i].initials + " - " + highScoresArr[i].score;
    highScoreHolder.appendChild(scores);
  }
  answers = document.querySelectorAll("#questionHolder button");
  
  for (var j = 0; j < answers.length; j++) {
    answers[j].classList.remove("disable");
  }
};

// Error Indicator //
var errorIndicator = function () {
  clearTimeout(timeset);
  timeset = setTimeout(() => {
    getelement("#errorIndicator").classList.add("invisible");
  }, 3000);
};

/* EVENT LISTENERS */
viewHighSoreEl.addEventListener("click", highscorebutton);
getelement("#reset").addEventListener("click", resetbutton);
startEl.addEventListener("click", quizstartbutton);
quizholderEl.addEventListener("click", answerquizbutton);
recordsEl.addEventListener("click", recordbutton);
getelement("#clearScores").addEventListener("click",clearscores);

loadHighScores();