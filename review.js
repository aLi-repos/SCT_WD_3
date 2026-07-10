const quizQuestions =
JSON.parse(localStorage.getItem("quizQuestions"));

const studentAnswers =
JSON.parse(localStorage.getItem("studentAnswers"));

const reviewList =
document.getElementById("reviewList");

quizQuestions.forEach(function(question,index){

    if(studentAnswers[index] !== question.answer){

        reviewList.innerHTML += `

        <div class="review-card">

            <h3>
                Question ${index+1}
            </h3>

            <p>
                <strong>Question:</strong>
                ${question.question}
            </p>

            <p>
                ❌ Your Answer:
                ${question.options[studentAnswers[index]] ?? "Not Answered"}
            </p>

            <p>
                ✅ Correct Answer:
                ${question.options[question.answer]}
            </p>

            <button
            onclick="showExplanation('${question.explanation}')">

                🤖 AI Explain

            </button>

        </div>

        `;

    }

});

function showExplanation(text){

    alert(text);

}