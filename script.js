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

if (closeLightbox) {

  closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

  });

}

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
// BACK TO TOP
// ==========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

  if(window.scrollY > 500){

    backToTop.classList.add("show");

  }else{

    backToTop.classList.remove("show");

  }

});

if (backToTop) {

  backToTop.addEventListener("click", () => {

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

  });

}

// ==========================
// LOADER
// ==========================

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  if (loader) {

    setTimeout(() => {

      loader.style.display = "none";

    }, 1500);

  }

});

// ==========================
// STATS COUNTER
// ==========================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{

const updateCounter=()=>{

const target=+counter.dataset.target;

const current=+counter.innerText.replace("K+","");

const increment=target/100;

if(current<target){

counter.innerText=Math.ceil(current+increment);

setTimeout(updateCounter,20);

}else{

if(target>=1000){

counter.innerText=(target/1000)+"K+";

}else{

counter.innerText=target;

}

}

};

updateCounter();

});

// ==========================
// EV SHOPPING CART
// ==========================

let cart = [];

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(button => {

  button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

      existingItem.quantity++;

    } else {

      cart.push({
        name: name,
        price: price,
        quantity: 1
      });

    }

    updateCart();

  });

});

function updateCart(){

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {

    totalItems += item.quantity;

    totalPrice += item.price * item.quantity;

  });

  const cartCount = document.getElementById("cartCount");

  if(cartCount){

    cartCount.innerText = totalItems;

  }

  const cartTotal = document.getElementById("cartTotal");

  if(cartTotal){

    cartTotal.innerText = "$" + totalPrice.toFixed(2);

  }

}
