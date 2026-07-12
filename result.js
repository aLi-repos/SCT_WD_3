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

// Best Score

document.getElementById("bestScore").textContent =
`${currentStudent.bestScore} / 15`;

// Attempts

document.getElementById("attempts").textContent =
currentStudent.attempts;

// PASS / FAIL

const status =
document.getElementById("status");

if(score >= 8){

    status.textContent =
    "🟢 PASS";

    status.style.color =
    "#22c55e";

}
else{

    status.textContent =
    "🔴 FAIL";

    status.style.color =
    "#ef4444";

}