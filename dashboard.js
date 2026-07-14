// ==========================================================
// FORGEX
// DASHBOARD
// dashboard.js
// ==========================================================

// ==============================
// GET LOGGED IN STUDENT
// ==============================

let currentStudent =
JSON.parse(localStorage.getItem("currentStudent"));

if(!currentStudent){

    window.location.href = "login.html";

}

// ==============================
// REFRESH STUDENT DATA
// ==============================

const students =
JSON.parse(localStorage.getItem("students")) || [];

const latestStudent =
students.find(function(student){

    return student.id === currentStudent.id;

});

if(latestStudent){

    currentStudent = latestStudent;

    localStorage.setItem(
        "currentStudent",
        JSON.stringify(currentStudent)
    );

}

// ==============================
// ELEMENTS
// ==============================

const studentName =
document.getElementById("studentName");

const bestScore =
document.getElementById("bestScore");

const attempts =
document.getElementById("attempts");

const lastScore =
document.getElementById("lastScore");

const progressFill =
document.getElementById("progressFill");

const progressText =
document.getElementById("progressText");

const historyList =
document.getElementById("historyList");

const leaderboardList =
document.getElementById("leaderboardList");

// ==============================
// STUDENT INFO
// ==============================

if(studentName){

    studentName.textContent =
    currentStudent.name;

}

if(bestScore){

    bestScore.textContent =
    `${currentStudent.bestScore || 0} / 15`;

}

if(attempts){

    attempts.textContent =
    currentStudent.attempts || 0;

}

if(lastScore){

    lastScore.textContent =
    `${currentStudent.lastScore || 0} / 15`;

}

// ==============================
// PROGRESS BAR
// ==============================

if(progressFill && progressText){

    const progress =
    Math.round(
        ((currentStudent.bestScore || 0) / 15) * 100
    );

    progressFill.style.width =
    progress + "%";

    progressText.textContent =
    progress + "%";

}

// ==============================
// QUIZ HISTORY
// ==============================

if(historyList){

    historyList.innerHTML = "";

    if(currentStudent.history &&
       currentStudent.history.length){

        currentStudent.history
        .slice()
        .reverse()
        .forEach(function(item,index){

            historyList.innerHTML +=

            `
            <div class="history-card">

                <h3>

                Attempt ${currentStudent.history.length-index}

                </h3>

                <p>

                Score:
                ${item.score}/${item.total}

                </p>

                <p>

                ${item.date}

                </p>

            </div>
            `;

        });

    }

    else{

        historyList.innerHTML =

        `
        <div class="history-card">

        No quiz history yet.

        </div>
        `;

    }

}

// ==============================
// LEADERBOARD
// ==============================

if(leaderboardList){

    leaderboardList.innerHTML = "";

    const ranking =
    [...students].sort(function(a,b){

        return (b.bestScore||0) -
               (a.bestScore||0);

    });

    ranking.forEach(function(student,index){

        leaderboardList.innerHTML +=

        `
        <div class="leaderboard-item">

            <div class="rank">

            #${index+1}

            </div>

            <div class="student-info">

                <h3>

                ${student.name}

                </h3>

                <p>

                Attempts:
                ${student.attempts || 0}

                </p>

            </div>

            <div class="score">

                ${student.bestScore || 0}/15

            </div>

        </div>
        `;

    });

}

// ==============================
// LOGOUT
// ==============================

const logoutButton =
document.querySelector(".logout-btn");

if(logoutButton){

    logoutButton.addEventListener("click",function(event){

        event.preventDefault();

        localStorage.removeItem("currentStudent");

        window.location.href =
        "login.html";

    });

}