const student =
JSON.parse(localStorage.getItem("currentStudent"));

if(!student){

    window.location.href="login.html";

}

document.getElementById("welcomeMessage").textContent =
`Welcome Back, ${student.name} 👋`;

document.getElementById("bestScore").textContent =
`${student.bestScore || 0} / 15`;

document.getElementById("attempts").textContent =
student.attempts || 0;

document.getElementById("lastScore").textContent =
`${student.lastScore || 0} / 15`;

const progress =
Math.round(((student.bestScore || 0)/15)*100);

document.getElementById("progressFill").style.width =
progress+"%";

document.getElementById("progressText").textContent =
progress+"%";
const history =
document.getElementById("historyList");

if(student.history && student.history.length){

student.history.forEach(function(item){

history.innerHTML +=

`
<div class="history-card">

<h3>

${item.score}/15

</h3>

<p>

${item.date}

</p>

</div>

`;

});

}
else{

history.innerHTML="<p>No quiz history yet.</p>";

}
const students =
JSON.parse(localStorage.getItem("students")) || [];

students.sort(function(a,b){

return (b.bestScore||0)-(a.bestScore||0);

});

const leaderboard =
document.getElementById("leaderboardList");

students.forEach(function(student,index){

leaderboard.innerHTML +=

`
<div class="history-card">

<h3>

${index+1}. ${student.name}

</h3>

<p>

${student.bestScore||0}/15

</p>

</div>

`;

});