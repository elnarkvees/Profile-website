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
