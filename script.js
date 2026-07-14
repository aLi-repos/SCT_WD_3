// ==========================================================
// RESPONSIVE MOBILE NAVIGATION
// ==========================================================

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-links");

if(menuToggle && navMenu){

    menuToggle.addEventListener("click",function(){

        navMenu.classList.toggle("active");

        if(navMenu.classList.contains("active")){

            menuToggle.innerHTML = "✕";

        }

        else{

            menuToggle.innerHTML = "☰";

        }

    });

}

// ==========================================================
// CLOSE MENU AFTER CLICKING A LINK
// ==========================================================

const mobileLinks =
document.querySelectorAll(".nav-links a");

mobileLinks.forEach(function(link){

    link.addEventListener("click",function(){

        if(navMenu){

            navMenu.classList.remove("active");

        }

        if(menuToggle){

            menuToggle.innerHTML = "☰";

        }

    });

});

// ==========================================================
// CLOSE MENU WHEN WINDOW IS RESIZED
// ==========================================================

window.addEventListener("resize",function(){

    if(window.innerWidth > 768){

        if(navMenu){

            navMenu.classList.remove("active");

        }

        if(menuToggle){

            menuToggle.innerHTML = "☰";

        }

    }

});