// ===============================
// FORGEX QUIZ ENGINE
// Part 3A
// ===============================

// Total Questions
const TOTAL_QUESTIONS = Math.min(15, questions.length);

// Quiz Data
let quizQuestions = [];
let studentAnswers = [];
let currentQuestion = 0;

// Timer
let timeLeft = 30 * 60;

// Elements
const questionElement = document.getElementById("question");
const questionNumber = document.getElementById("questionNumber");
const timerElement = document.getElementById("timer");

const optionButtons =
document.querySelectorAll(".option-btn");

const previousBtn =
document.getElementById("previousBtn");

const nextBtn =
document.getElementById("nextBtn");

const submitBtn =
document.getElementById("submitBtn");

// ===============================
// RANDOM QUESTIONS
// ===============================

function generateQuiz(){

    let shuffled = [...questions];

    shuffled.sort(function(){

        return Math.random() - 0.5;

    });

    quizQuestions =
    shuffled.slice(0, TOTAL_QUESTIONS);

}

// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion(){

    const currentQuiz =
quizQuestions[currentQuestion];

if(!currentQuiz){

    console.error("Question not found.");

    return;

}


    questionNumber.textContent =
    `Question ${currentQuestion + 1} / ${TOTAL_QUESTIONS}`;

    questionElement.textContent =
    currentQuiz.question;

    optionButtons.forEach(function(button,index){

        button.textContent =
        currentQuiz.options[index];

        button.classList.remove("selected");

        if(studentAnswers[currentQuestion] === index){

            button.classList.add("selected");

        }

    });

    previousBtn.disabled =
    currentQuestion === 0;

    if(currentQuestion === TOTAL_QUESTIONS - 1){

        nextBtn.style.display = "none";

        submitBtn.style.display = "inline-block";

    }

    else{

        nextBtn.style.display = "inline-block";

        submitBtn.style.display = "none";

    }

}

// ===============================
// SELECT OPTION
// ===============================

optionButtons.forEach(function(button,index){

    button.addEventListener("click",function(){

        studentAnswers[currentQuestion] = index;

        loadQuestion();

    });

});

// ===============================
// NEXT BUTTON
// ===============================

nextBtn.addEventListener("click",function(){

    if(currentQuestion < TOTAL_QUESTIONS - 1){

        currentQuestion++;

        loadQuestion();

    }

});

// ===============================
// PREVIOUS BUTTON
// ===============================

previousBtn.addEventListener("click",function(){

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

});
// ===============================
// TIMER
// ===============================

function startTimer(){

    const countdown = setInterval(function(){

        const minutes = Math.floor(timeLeft / 60);

        const seconds = timeLeft % 60;

        timerElement.textContent =
        `⏱ ${minutes}:${seconds.toString().padStart(2,"0")}`;

        timeLeft--;

        if(timeLeft < 0){

            clearInterval(countdown);

            alert("Time is over! Quiz submitted automatically.");

            submitQuiz();

        }

    },1000);

}
// ===============================
// CALCULATE SCORE
// ===============================

function calculateScore(){

    let score = 0;

    quizQuestions.forEach(function(question,index){

        if(studentAnswers[index] === question.answer){

            score++;

        }

    });

    return score;

}
// ===============================
// SUBMIT QUIZ
// ===============================

function submitQuiz(){

    const score = calculateScore();

    localStorage.setItem(
        "score",
        score
    );

    localStorage.setItem(
        "quizQuestions",
        JSON.stringify(quizQuestions)
    );

    localStorage.setItem(
        "studentAnswers",
        JSON.stringify(studentAnswers)
    );

    saveStudentProgress(score);

    window.location.href = "result.html";

}
// ===============================
// SUBMIT BUTTON
// ===============================

submitBtn.addEventListener("click",function(){

    submitQuiz();

});
// ===============================
// SAVE STUDENT PROGRESS
// ===============================

function saveStudentProgress(score){

    // Get all students
    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    // Get logged in student
    let currentStudent =
    JSON.parse(localStorage.getItem("currentStudent"));

    if(!currentStudent){

        alert("Please login again.");

        window.location.href="login.html";

        return;

    }

    // Find current student inside students array
    const index =
    students.findIndex(function(student){

        return student.email === currentStudent.email;

    });

    if(index === -1){

        alert("Student not found.");

        return;

    }

    // Update attempts
    students[index].attempts =
    (students[index].attempts || 0) + 1;

    // Update best score
    students[index].bestScore =
    Math.max(students[index].bestScore || 0, score);

    // Save last score
    students[index].lastScore = score;

    // Create history if missing
    if(!students[index].history){

        students[index].history = [];

    }

    // Add quiz history
    students[index].history.push({

        score: score,

        total: TOTAL_QUESTIONS,

        date: new Date().toLocaleString()

    });

    // Save updated students array
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    // Update current student
    currentStudent = students[index];

    localStorage.setItem(
        "currentStudent",
        JSON.stringify(currentStudent)
    );

}
// ===============================
// SAVE STUDENT PROGRESS
// ===============================

function saveStudentProgress(score){

    // Get all students
    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    // Get logged in student
    let currentStudent =
    JSON.parse(localStorage.getItem("currentStudent"));

    if(!currentStudent){

        alert("Please login again.");

        window.location.href="login.html";

        return;

    }

    // Find current student inside students array
    const index =
    students.findIndex(function(student){

        return student.email === currentStudent.email;

    });

    if(index === -1){

        alert("Student not found.");

        return;

    }

    // Update attempts
    students[index].attempts =
    (students[index].attempts || 0) + 1;

    // Update best score
    students[index].bestScore =
    Math.max(students[index].bestScore || 0, score);

    // Save last score
    students[index].lastScore = score;

    // Create history if missing
    if(!students[index].history){

        students[index].history = [];

    }

    // Add quiz history
    students[index].history.push({

        score: score,

        total: TOTAL_QUESTIONS,

        date: new Date().toLocaleString()

    });

    // Save updated students array
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    // Update current student
    currentStudent = students[index];

    localStorage.setItem(
        "currentStudent",
        JSON.stringify(currentStudent)
    );

}
// ===============================
// QUIZ INITIALIZATION
// ===============================

function initializeQuiz(){

    // Check if questions are available
    if(!questions || questions.length === 0){

        alert("No quiz questions available.");

        return;

    }

    // Generate random quiz
    generateQuiz();

    // Reset current question
    currentQuestion = 0;

    // Clear previous answers
    studentAnswers = [];

    // Load first question
    loadQuestion();

    // Start timer
    startTimer();

}

// ===============================
// START APPLICATION
// ===============================

initializeQuiz();