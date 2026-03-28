const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop = section.offsetTop;
const sectionHeight = section.clientHeight;

if(pageYOffset >= sectionTop - 200){
current = section.getAttribute("id");
}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(link.getAttribute("href").includes(current)){
link.classList.add("active");
}

});

});
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

reveals.forEach((element) => {

const windowHeight = window.innerHeight;
const revealTop = element.getBoundingClientRect().top;
const revealPoint = 120;

if(revealTop < windowHeight - revealPoint){
element.classList.add("active");
}

});

});