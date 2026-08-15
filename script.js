
const CONFIG = {
  googleBusinessUrl: "https://maps.app.goo.gl/eThwuUmQABZHSxiR9?g_st=com.google.maps.preview.copy",
  bookingEmail: "elnark.vees@gmail.com"
};

const products = [
  {id:"tee",name:"EV Signature Tee",price:35,material:"Cotton jersey",color:"Black",fit:"Regular fit",image:"images/merch/ev-collection.jpg"},
  {id:"hoodie",name:"EV V Hoodie",price:65,material:"Heavyweight cotton blend",color:"Brown",fit:"Relaxed fit",image:"images/merch/ev-collection.jpg"},
  {id:"cap",name:"EV Signature Cap",price:30,material:"Cotton twill",color:"Black",fit:"Adjustable",image:"images/merch/ev-collection-alt.jpg"},
  {id:"weekendy-vinyl",name:"Weekendy — Vinyl",price:35,material:"12-inch vinyl",color:"Collector edition",fit:"1LP",image:"images/merch/vinyl-reference.png"},
  {id:"lolita-vinyl",name:"Lolita — Vinyl",price:35,material:"12-inch vinyl",color:"Collector edition",fit:"1LP",image:"images/music/lolita.png"},
  {id:"inaniaffect-vinyl",name:"Inaniaffect — Vinyl",price:35,material:"12-inch vinyl",color:"Collector edition",fit:"1LP",image:"images/music/inaniaffect.png"}
];

let cart = JSON.parse(localStorage.getItem("evCart") || "[]");

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function money(n){return `$${n.toFixed(2)}`}

function renderProducts(){
  const grid = $("#productGrid");
  if(!grid) return;
  grid.innerHTML = products.map(p => `
    <article class="product">
      <img src="${p.image}" alt="${p.name}">
      <div class="product-body">
        <div class="eyebrow">EV Collection</div>
        <h3>${p.name}</h3>
        <div class="price">${money(p.price)}</div>
        <p class="muted">${p.material} · ${p.color}</p>
        <button class="btn" data-add="${p.id}">Add to cart</button>
      </div>
    </article>
  `).join("");
  $$("[data-add]").forEach(b => b.onclick = () => addToCart(b.dataset.add));
}

function saveCart(){localStorage.setItem("evCart", JSON.stringify(cart)); renderCart();}

function addToCart(id){
  const p=products.find(x=>x.id===id);
  const item=cart.find(x=>x.id===id);
  if(item) item.qty++;
  else cart.push({id:p.id,qty:1});
  saveCart();
  showToast("Added to your bag");
}

function renderCart(){
  const count=cart.reduce((a,x)=>a+x.qty,0);
  $("#cartCount").textContent=count;
  const items=$("#cartItems");
  if(!items) return;
  if(!cart.length){items.innerHTML='<p class="muted">Your bag is empty.</p>';}
  else items.innerHTML=cart.map(x=>{
    const p=products.find(y=>y.id===x.id);
    return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><div class="muted">${money(p.price)} × ${x.qty}</div><button class="link-btn" data-remove="${p.id}">Remove</button></div><strong>${money(p.price*x.qty)}</strong></div>`;
  }).join("");
  $$("[data-remove]").forEach(b=>b.onclick=()=>{cart=cart.filter(x=>x.id!==b.dataset.remove);saveCart()});
  const subtotal=cart.reduce((a,x)=>a+products.find(y=>y.id===x.id).price*x.qty,0);
  $("#subtotal").textContent=money(subtotal); $("#total").textContent=money(subtotal);
}

function showToast(text){const t=$("#toast");t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800)}

function openPage(id){
  $$(".page").forEach(p=>p.classList.toggle("active",p.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
  closeMenu();
  history.replaceState(null,"","#"+id);
}

function openMenu(){$("#drawer").classList.add("open")}
function closeMenu(){$("#drawer").classList.remove("open")}

document.addEventListener("click",e=>{
  const go=e.target.closest("[data-go]");
  if(go){openPage(go.dataset.go);return}
});

$("#menuBtn")?.addEventListener("click",openMenu);
$("#menuClose")?.addEventListener("click",closeMenu);
$("#drawer")?.addEventListener("click",e=>{if(e.target.id==="drawer")closeMenu()});
$("#cartBtn")?.addEventListener("click",()=>$("#cart").classList.add("open"));
$("#cartClose")?.addEventListener("click",()=>$("#cart").classList.remove("open"));

$("#checkoutBtn")?.addEventListener("click",()=>{
  if(!cart.length){showToast("Your bag is empty");return}
  showToast("Checkout is ready for payment-provider connection");
});

$("#googleBusiness")?.setAttribute("href",CONFIG.googleBusinessUrl);
$("#bookingEmail")?.setAttribute("href",`mailto:${CONFIG.bookingEmail}`);

renderProducts();renderCart();

const initial=location.hash.replace("#","")||"home";
if($("#"+initial)) openPage(initial);
