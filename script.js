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

// ==========================
// LIGHTBOX
// ==========================

const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

galleryImages.forEach(image => {

  image.addEventListener("click", () => {

    lightbox.classList.add("active");

    lightboxImg.src = image.src;

  });

});

closeLightbox.addEventListener("click", () => {

  lightbox.classList.remove("active");

});

lightbox.addEventListener("click", (e) => {

  if(e.target === lightbox){

    lightbox.classList.remove("active");

  }

});

// ==========================
// GALLERY FILTER
// ==========================

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter = button.dataset.filter;

galleryItems.forEach(item=>{

if(filter==="all" || item.classList.contains(filter)){

item.style.display="block";

}else{

item.style.display="none";

}

});

});

});

// ==========================
// GALLERY FILTER
// ==========================

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    const filter = button.dataset.filter;

    galleryItems.forEach(item => {

      if(filter === "all" || item.classList.contains(filter)){

        item.style.display = "block";

      }else{

        item.style.display = "none";

      }

    });

  });

});
