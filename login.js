// ======================================================
// FORGEX
// LOGIN
// login.js
// ======================================================

// ================================
// SELECT ELEMENTS
// ================================

const loginForm =
document.getElementById("loginForm");

const emailInput =
document.getElementById("loginEmail");

const passwordInput =
document.getElementById("loginPassword");

const togglePassword =
document.getElementById("togglePassword");

// ================================
// SHOW / HIDE PASSWORD
// ================================

if(togglePassword){

    togglePassword.addEventListener("click",function(){

        if(passwordInput.type === "password"){

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

        }

        else{

            passwordInput.type = "password";

            togglePassword.textContent = "👁";

        }

    });

}

// ================================
// LOGIN
// ================================

if(loginForm){

    loginForm.addEventListener("submit",function(event){

        event.preventDefault();

        const email =
        emailInput.value.trim().toLowerCase();

        const password =
        passwordInput.value;

        const students =
        JSON.parse(localStorage.getItem("students")) || [];

        const student =
        students.find(function(user){

            return user.email === email &&
                   user.password === password;

        });

        if(!student){

            alert("❌ Invalid Email or Password");

            return;

        }

        // ===========================
        // UPDATE LOGIN DETAILS
        // ===========================

        student.loginCount =
        (student.loginCount || 0) + 1;

        localStorage.setItem(
            "currentStudent",
            JSON.stringify(student)
        );

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        alert("✅ Login Successful!");

        window.location.href =
        "dashboard.html";

    });

}