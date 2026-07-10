// ======================
// SIGNUP
// ======================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let students = JSON.parse(localStorage.getItem("students")) || [];

        const existingStudent = students.find(function(student){
            return student.email === email;
        });

        if(existingStudent){
            alert("Email already registered!");
            return;
        }

        const student = {

            name: fullName,
            email: email,
            password: password,

            bestScore: 0,
            attempts: 0,
            loginCount: 0,
            history: []

        };

        students.push(student);

        localStorage.setItem("students", JSON.stringify(students));

        alert("Account Created Successfully!");

        window.location.href = "login.html";

    });

}
// ======================
// LOGIN
// ======================

const loginForm = document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit",function(event){

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        let students = JSON.parse(localStorage.getItem("students")) || [];

        const student = students.find(function(user){

            return user.email === email &&
                   user.password === password;

        });

        if(student){

            student.loginCount++;

            localStorage.setItem("currentStudent",JSON.stringify(student));

            localStorage.setItem("students",JSON.stringify(students));

            alert("Login Successful!");

            window.location.href="dashboard.html";

        }

        else{

            alert("Invalid Email or Password");

        }

    });

}
// ======================
// DASHBOARD
// ======================

const studentName = document.getElementById("studentName");

if(studentName){

    const currentStudent =
    JSON.parse(localStorage.getItem("currentStudent"));

    if(currentStudent){

        studentName.textContent = currentStudent.name;

    }

}