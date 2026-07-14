// ======================================================
// FORGEX
// FORGOT PASSWORD
// forgot-password.js
// ======================================================

// ================================
// SELECT ELEMENTS
// ================================

const forgotForm =
document.getElementById("forgotPasswordForm");

const emailInput =
document.getElementById("resetEmail");

const newPasswordInput =
document.getElementById("newPassword");

const confirmPasswordInput =
document.getElementById("confirmNewPassword");

const toggleNewPassword =
document.getElementById("toggleNewPassword");

const toggleConfirmPassword =
document.getElementById("toggleConfirmPassword");

// ================================
// SHOW / HIDE NEW PASSWORD
// ================================

if(toggleNewPassword){

    toggleNewPassword.addEventListener("click",function(){

        if(newPasswordInput.type === "password"){

            newPasswordInput.type = "text";

            toggleNewPassword.textContent = "🙈";

        }

        else{

            newPasswordInput.type = "password";

            toggleNewPassword.textContent = "👁";

        }

    });

}

// ================================
// SHOW / HIDE CONFIRM PASSWORD
// ================================

if(toggleConfirmPassword){

    toggleConfirmPassword.addEventListener("click",function(){

        if(confirmPasswordInput.type === "password"){

            confirmPasswordInput.type = "text";

            toggleConfirmPassword.textContent = "🙈";

        }

        else{

            confirmPasswordInput.type = "password";

            toggleConfirmPassword.textContent = "👁";

        }

    });

}

// ================================
// RESET PASSWORD
// ================================

if(forgotForm){

    forgotForm.addEventListener("submit",function(event){

        event.preventDefault();

        const email =
        emailInput.value.trim().toLowerCase();

        const newPassword =
        newPasswordInput.value;

        const confirmPassword =
        confirmPasswordInput.value;

        // ============================
        // VALIDATION
        // ============================

        if(newPassword.length < 6){

            alert("Password must contain at least 6 characters.");

            return;

        }

        if(newPassword !== confirmPassword){

            alert("Passwords do not match.");

            return;

        }

        // ============================
        // GET STUDENTS
        // ============================

        const students =
        JSON.parse(localStorage.getItem("students")) || [];

        const student =
        students.find(function(user){

            return user.email === email;

        });

        if(!student){

            alert("No account found with this email.");

            return;

        }

        // ============================
        // UPDATE PASSWORD
        // ============================

        student.password = newPassword;

        localStorage.setItem(

            "students",

            JSON.stringify(students)

        );

        // If this user is currently logged in,
        // update currentStudent too.

        const currentStudent =
        JSON.parse(localStorage.getItem("currentStudent"));

        if(currentStudent &&
           currentStudent.email === student.email){

            currentStudent.password =
            newPassword;

            localStorage.setItem(

                "currentStudent",

                JSON.stringify(currentStudent)

            );

        }

        // ============================
        // SUCCESS
        // ============================

        alert("✅ Password reset successfully!\n\nPlease login with your new password.");

        forgotForm.reset();

        window.location.href =
        "login.html";

    });

}