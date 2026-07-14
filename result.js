// ===============================
// RESULT PAGE
// ===============================

const score =
Number(localStorage.getItem("score")) || 0;

const currentStudent =
JSON.parse(localStorage.getItem("currentStudent"));

if(!currentStudent){

    alert("Please login again.");

    window.location.href = "login.html";

}

// Student Name

document.getElementById("studentName").textContent =
`Congratulations, ${currentStudent.name}! 🎉`;

// Score

document.getElementById("score").textContent =
`${score} / 15`;

// Percentage

    const percentage =
    Math.round((score / 15) * 100);

    document.getElementById("percentage").textContent =
    `${percentage}%`;

    const students =
    JSON.parse(localStorage.getItem("students")) || [];

    const updatedStudent =
    students.find(function(student){

        return student.email === currentStudent.email;

    }) || currentStudent;

    document.getElementById("bestScore").textContent =
    `${updatedStudent.bestScore || 0} / 15`;

    document.getElementById("attempts").textContent =
    updatedStudent.attempts || 0;

// PASS / FAIL

// ======================================
// PERFORMANCE STATUS
// ======================================

const status =
document.getElementById("status");

const resultButtons =
document.querySelector(".result-buttons");

let message = "";

if(score <= 7){

    status.innerHTML =
    "🔴 Beginner";

    status.style.color =
    "#ef4444";

    message =
    "Don't worry! Every expert starts somewhere. Review your mistakes and try again.";

    resultButtons.innerHTML =

    `
    <a href="quiz.html" class="primary-btn">

        🔄 Try Again

    </a>

    <a href="review.html" class="secondary-btn">

        📖 Review Answers

    </a>

    <a href="dashboard.html" class="secondary-btn">

        🏠 Dashboard

    </a>
    `;

}

else if(score <= 11){

    status.innerHTML =
    "🟡 Learner";

    status.style.color =
    "#facc15";

    message =
    "Good progress! Review the questions you missed and keep improving.";

    resultButtons.innerHTML =

    `
    <a href="review.html" class="primary-btn">

        📖 Review Answers

    </a>

    <a href="dashboard.html" class="secondary-btn">

        🚀 Keep Learning

    </a>
    `;

}

else if(score <= 13){

    status.innerHTML =
    "🔵 Skilled";

    status.style.color =
    "#38bdf8";

    message =
    "Excellent work! You're very close to mastery. Keep practicing to reach perfection.";

    resultButtons.innerHTML =

    `
    <a href="review.html" class="primary-btn">

        📖 Review Answers

    </a>

    <a href="dashboard.html" class="secondary-btn">

        🚀 Keep Up

    </a>
    `;

}

else if(score === 14){

    status.innerHTML =
    "🟣 Advanced";

    status.style.color =
    "#a855f7";

    message =
    "Amazing! Only one answer away from a perfect score.";

    resultButtons.innerHTML =

    `
    <a href="review.html" class="primary-btn">

        📖 Review Answers

    </a>

    <a href="dashboard.html" class="secondary-btn">

        ⭐ Keep Going

    </a>
    `;

}

else{

    status.innerHTML =
    "🏆 Master";

    status.style.color =
    "#22c55e";

    message =
    "Congratulations! You achieved a perfect score. Outstanding performance!";

    resultButtons.innerHTML =

    `
    <a href="dashboard.html" class="primary-btn">

        🎉 Celebrate

    </a>
    `;

}

// ======================================
// MOTIVATION MESSAGE
// ======================================

const motivationalText =
document.createElement("p");

motivationalText.className =
"motivation-text";

motivationalText.textContent =
message;

status.after(motivationalText);