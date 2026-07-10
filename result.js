const score = Number(localStorage.getItem("score"));

const currentStudentEmail =
localStorage.getItem("currentStudent");

const students =
JSON.parse(localStorage.getItem("students")) || [];

const student =
students.find(s => s.email === currentStudentEmail);

document.getElementById("studentName").textContent =
"Congratulations, " + student.name + " 🎉";

document.getElementById("score").textContent =
score + " / 15";

const percentage =
Math.round((score / 15) * 100);

document.getElementById("percentage").textContent =
percentage + "%";

document.getElementById("bestScore").textContent =
student.bestScore + " / 15";

document.getElementById("attempts").textContent =
student.attempts;

const status =
document.getElementById("status");

if(score >= 8){

    status.innerHTML = "🟢 PASS";

    status.style.color = "#22c55e";

}
else{

    status.innerHTML = "🔴 FAIL";

    status.style.color = "#ef4444";

}