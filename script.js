let cart = [];

// ===== Elements =====
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("searchInput");

// ===== Add To Cart =====
document.querySelectorAll(".product button").forEach(button=>{

button.addEventListener("click",()=>{

const product = button.closest(".product");

const name = product.querySelector("h3").innerText;

const priceText = product.querySelector(".new-price").innerText;

const price = parseInt(priceText.replace(/[^\d]/g, ""), 10);

const selects = product.querySelectorAll("select");

const colour = selects.length > 0 ? selects[0].value : "";

const quantityInput = product.querySelector(".quantity");

const quantity = quantityInput ? Number(quantityInput.value) : 1;

cart.push({
name,
price,
colour,
quantity
});

displayCart();

});

});

// ===== Display Cart =====
function displayCart(){

if(cart.length===0){

cartItems.innerHTML="<p>Your cart is empty.</p>";

cartTotal.innerHTML="Total: ₦0";

return;

}

cartItems.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total += item.price * item.quantity;

const div=document.createElement("div");

div.innerHTML=`

<h4>${item.name}</h4>

<p>Colour: ${item.colour}</p>

<p>Qty: ${item.quantity || 1}</p>

<p>₦${item.price.toLocaleString()}</p>

<button onclick="removeFromCart(${index})">

Remove

</button>

`;

cartItems.appendChild(div);

});

cartTotal.innerHTML="Total: ₦"+total.toLocaleString();

}

// ===== Remove =====
function removeFromCart(index){

cart.splice(index,1);

displayCart();

}

window.removeFromCart=removeFromCart;

// ===== Search =====
if (searchInput) {

  searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    document.querySelectorAll(".product").forEach(product => {

      const text = product.innerText.toLowerCase();

      if (text.includes(value)) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }

    });

  });

}

// ===== Product Popup =====
const popup=document.getElementById("productPopup");
const popupImage=document.getElementById("popupImage");
const popupTitle=document.getElementById("popupTitle");
const popupPrice=document.getElementById("popupPrice");
const closePopup=document.querySelector(".close-popup");

document.querySelectorAll(".product img").forEach(img=>{

img.addEventListener("click",()=>{

const product=img.closest(".product");

popupImage.src=img.src;

popupTitle.innerText=product.querySelector("h3").innerText;

popupPrice.innerText=product.querySelector(".new-price").innerText;

popup.style.display="flex";

});

});

if(closePopup){

closePopup.onclick=()=>{

popup.style.display="none";

};

}

window.onclick=function(e){

if(e.target===popup){

popup.style.display="none";

}

};

// ===== WhatsApp Checkout =====
const orderForm=document.getElementById("order-form");

if(orderForm){

orderForm.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("customerName").value;

const phone=document.getElementById("customerPhone").value;

const address=document.getElementById("customerAddress").value;

let message=`Hello Fjs Kollection 💕%0A%0A`;

message+=`Name: ${name}%0A`;

message+=`Phone: ${phone}%0A`;

message+=`Address: ${address}%0A%0A`;

message+="Order:%0A";

let total=0;

cart.forEach(item=>{

message+=`${item.name}%0A`;

message+=`Colour: ${item.colour}%0A`;

message+=`Qty: ${item.quantity}%0A`;

message+=`Price: ₦${item.price.toLocaleString()}%0A%0A`;

total+=item.price*item.quantity;

});

message+=`Total: ₦${total.toLocaleString()}`;

alert("WhatsApp part reached");

});

}
document.querySelectorAll(".favorite").forEach(function (heart) {

  heart.addEventListener("click", function (e) {

    e.stopPropagation();

    if (this.innerHTML === "🤍") {
      this.innerHTML = "❤️";
    } else {
      this.innerHTML = "🤍";
    }

  });

});
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");

filterButtons.forEach(button => {

  button.addEventListener("click", function(){

    filterButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");

    const filter = this.dataset.filter;

    products.forEach(product => {

      if(filter === "all" || product.dataset.category === filter){
        product.style.display = "";
      }else{
        product.style.display = "none";
      }

    });

  });

});
// ===== Scroll Animation =====

const animatedItems = document.querySelectorAll(
  ".product, .best-card, .arrival-card, .review-card, .why-card, .category"
);

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }

  });

}, {
  threshold: 0.2
});

animatedItems.forEach(item => {
  item.classList.add("animate");
  observer.observe(item);
});
const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {
    document
      .getElementById("checkout")
      .scrollIntoView({
        behavior: "smooth"
      });
  });
}
// ===== Load Products Automatically =====

const productList = document.getElementById("dynamic-products");

if (productList && typeof products !== "undefined") {

  products.forEach(product => {

    const div = document.createElement("div");

    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">

      <h3>${product.name}</h3>

      <p class="price">
        <span class="old-price">${product.oldPrice}</span>
        <span class="new-price">${product.price}</span>
      </p>

      <button>Add to Cart</button>
    `;

    productList.appendChild(div);

  });

}