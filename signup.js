// ==========================================================
// FORGEX
// SIGNUP PAGE
// signup.js
// ==========================================================

// ==============================
// SELECT FORM
// ==============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // ==============================
        // GET INPUT VALUES
        // ==============================

        const fullName =
        document.getElementById("fullName").value.trim();

        const email =
        document.getElementById("email").value.trim().toLowerCase();

        const password =
        document.getElementById("password").value;

        const confirmPassword =
        document.getElementById("confirmPassword").value;

        // ==============================
        // VALIDATION
        // ==============================

        if(fullName.length < 3){

            alert("Full name must contain at least 3 characters.");

            return;

        }

        const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){

            alert("Please enter a valid email address.");

            return;

        }

        if(password.length < 6){

            alert("Password must contain at least 6 characters.");

            return;

        }

        if(password !== confirmPassword){

            alert("Passwords do not match.");

            return;

        }

        // ==============================
        // GET STUDENTS
        // ==============================

        let students =
        JSON.parse(localStorage.getItem("students")) || [];

        // ==============================
        // CHECK DUPLICATE EMAIL
        // ==============================

        const exists =
        students.some(function(student){

            return student.email === email;

        });

        if(exists){

            alert("This email is already registered.");

            return;

        }

        // ==============================
        // CREATE STUDENT
        // ==============================

        const student = {

            id: Date.now(),

            name: fullName,

            email: email,

            password: password,

            bestScore: 0,

            lastScore: 0,

            attempts: 0,

            loginCount: 0,

            history: []

        };

        // ==============================
        // SAVE STUDENT
        // ==============================

        students.push(student);

        localStorage.setItem(

            "students",

            JSON.stringify(students)

        );

        // ==============================
        // SUCCESS
        // ==============================

        alert(

            "🎉 Account created successfully!\n\nPlease login."

        );

        signupForm.reset();

        window.location.href = "login.html";

    });

}