function openMenu(){
  document.getElementById("sideMenu")
  .classList.add("active");
}

function closeMenu(){
  document.getElementById("sideMenu")
  .classList.remove("active");
}


/* SCROLL ANIMATION */

const observer = new IntersectionObserver((entries)=>{

entries.forEach((entry)=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

const hiddenElements=document.querySelectorAll(".hidden");

hiddenElements.forEach((el)=>observer.observe(el));

/* ACTIVE NAVIGATION */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", ()=>{

let current="";

sections.forEach(section=>{

const sectionTop = section.offsetTop-150;

if(pageYOffset >= sectionTop){
current = section.getAttribute("id");
}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){
link.classList.add("active");
}

});

});
