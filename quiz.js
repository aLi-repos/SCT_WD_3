// Total Questions Needed

const TOTAL_QUESTIONS = 15;

// Random Questions Array

let quizQuestions = [];

// Current Question

let currentQuestion = 0;

// Student Answers
let timeLeft = 30 * 60;
// 30 minutes


let studentAnswers = [];

const optionButtons =
    document.querySelectorAll(".option-btn");
    
function generateQuiz(){

    let shuffled = [...questions];

    shuffled.sort(() => Math.random() - 0.5);

    quizQuestions = shuffled.slice(0, TOTAL_QUESTIONS);

}

function loadQuestion(){

    const questionElement =
    document.getElementById("question");

    const questionNumber =
    document.getElementById("questionNumber");

    const currentQuiz =
    quizQuestions[currentQuestion];

    questionNumber.textContent =
    `Question ${currentQuestion + 1} / ${TOTAL_QUESTIONS}`;

    questionElement.textContent =
    currentQuiz.question;

    optionButtons.forEach(function(button, index){

    button.textContent = currentQuiz.options[index];

    button.classList.remove("selected");

    if(studentAnswers[currentQuestion] === index){

        button.classList.add("selected");

    }

});

}

generateQuiz();

loadQuestion();
optionButtons.forEach(function(button, index){

    button.addEventListener("click", function(){

        studentAnswers[currentQuestion] = index;

        loadQuestion();

    });

});
document.getElementById("submitBtn").addEventListener("click", function(){

    let score = 0;

    quizQuestions.forEach(function(question, index){

        if(studentAnswers[index] === question.answer){

            score++;

        }

    });

    localStorage.setItem("score", score);

    localStorage.setItem("quizQuestions", JSON.stringify(quizQuestions));

    localStorage.setItem("studentAnswers", JSON.stringify(studentAnswers));

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let currentStudentEmail = localStorage.getItem("currentStudent");

    let currentStudent = students.find(student => student.email === currentStudentEmail);

    if(currentStudent){

        currentStudent.attempts++;

        if(score > currentStudent.bestScore){

            currentStudent.bestScore = score;

        }

        currentStudent.history.push(score);

        localStorage.setItem("students", JSON.stringify(students));

    }

    window.location.href = "result.html";

});
document.getElementById("nextBtn").addEventListener("click", function(){

    if(currentQuestion < TOTAL_QUESTIONS - 1){

        currentQuestion++;

        loadQuestion();

    }

});
document.getElementById("previousBtn").addEventListener("click", function(){

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

});
function startTimer(){

    const timer = document.getElementById("timer");

    const countdown = setInterval(function(){

        const minutes = Math.floor(timeLeft / 60);

        const seconds = timeLeft % 60;

        timer.textContent =
        `⏱ ${minutes}:${seconds.toString().padStart(2,'0')}`;

        timeLeft--;

        if(timeLeft < 0){

            clearInterval(countdown);

            alert("Time is over! Quiz submitted automatically.");

            document.getElementById("submitBtn").click();

        }

    },1000);

}
generateQuiz();

loadQuestion();
startTimer();