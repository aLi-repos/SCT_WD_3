// ===============================
// REVIEW PAGE
// ===============================

const quizQuestions =
JSON.parse(localStorage.getItem("quizQuestions")) || [];

const studentAnswers =
JSON.parse(localStorage.getItem("studentAnswers")) || [];

const reviewList =
document.getElementById("reviewList");

// No questions

if(quizQuestions.length === 0){

    reviewList.innerHTML =

    `
    <div class="empty-review">

        No quiz data found.

    </div>
    `;

}

// Build Review

else{

    quizQuestions.forEach(function(question,index){

        const studentAnswer =
        studentAnswers[index];

        const isCorrect =
        studentAnswer === question.answer;

        const reviewCard =
        document.createElement("div");

        reviewCard.className =
        "review-card";

        reviewCard.innerHTML =

        `
        <h3>
        Question ${index+1}
        </h3>

        <p>

        <strong>Question:</strong>

        ${question.question}

        </p>

        <p>

        <strong>Your Answer:</strong>

        ${
            studentAnswer !== undefined
            ?
            question.options[studentAnswer]
            :
            "Not Answered"
        }

        </p>

        <p>

        <strong>Correct Answer:</strong>

        ${question.options[question.answer]}

        </p>

        <p>

        <strong>Status:</strong>

        ${
            isCorrect
            ?
            "✅ Correct"
            :
            "❌ Incorrect"
        }

        </p>

        <p>

        <strong>Explanation:</strong>

        ${question.explanation}

        </p>

        `;

        reviewList.appendChild(reviewCard);

    });

}