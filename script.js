// ===============================
// FJS KOLLECTION - SCRIPT.JS
// PART 1
// ===============================

let cart = [];
let wishlist = [];


// ===============================
// LOAD PRODUCTS
// ===============================

const productContainer = document.getElementById("product-list");

function loadProducts(){

  if(!productContainer) return;

  productContainer.innerHTML = "";

  products.forEach(product => {

    const discount = product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;


    const productCard = document.createElement("div");

    productCard.className = "product";
    productCard.dataset.category = product.category;


    productCard.innerHTML = `

      ${product.badge ? `<span class="badge sale">${product.badge}</span>` : ""}

      <span class="favorite" data-id="${product.id}">
        🤍
      </span>


      <img 
        src="${product.image}" 
        alt="${product.name}"
        class="product-image"
      >


      <h3>${product.name}</h3>


      <div class="rating">
        ⭐⭐⭐⭐⭐
        <span>(${product.rating})</span>
      </div>


      <p class="description">
        ${product.description}
      </p>


      <p class="stock">
        ${
          product.stock <= 3
          ? `Only ${product.stock} left`
          : "In Stock"
        }
      </p>


      <p class="price">

        ${
          product.oldPrice
          ? `<span class="old-price">
              ₦${product.oldPrice.toLocaleString()}
             </span>`
          : ""
        }


        <span class="new-price">
          ₦${product.price.toLocaleString()}
        </span>

      </p>


      ${
        product.colours.length
        ?
        `
        <label>Colour:</label>

        <select class="colour">

          ${product.colours.map(colour =>

            `<option>${colour}</option>`

          ).join("")}

        </select>
        `
        :
        ""
      }


      ${
        product.sizes.length
        ?
        `
        <label>Size:</label>

        <select class="size">

          ${product.sizes.map(size =>

            `<option>${size}</option>`

          ).join("")}

        </select>
        `
        :
        ""
      }



      <label>Quantity:</label>

      <select class="quantity">

        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>

      </select>


      <button class="add-cart">
        Add To Cart
      </button>


    `;


    productContainer.appendChild(productCard);


  });


}


// Start loading products

loadProducts();



// ===============================
// ADD TO CART
// ===============================


document.addEventListener("click", function(e){


  if(e.target.classList.contains("add-cart")){


    const productCard = e.target.closest(".product");


    const productName =
      productCard.querySelector("h3").innerText;


    const product =
      products.find(item => item.name === productName);



    const colour =
      productCard.querySelector(".colour")
      ?
      productCard.querySelector(".colour").value
      :
      "";



    const size =
      productCard.querySelector(".size")
      ?
      productCard.querySelector(".size").value
      :
      "";



    const quantity =
      Number(productCard.querySelector(".quantity").value);



    cart.push({

      name: product.name,

      price: product.price,

      image: product.image,

      colour,

      size,

      quantity

    });


    updateCart();


    alert("Added to cart 💕");


  }


});



// ===============================
// DISPLAY CART
// ===============================


function updateCart(){


const cartItems =
document.getElementById("cart-items");


const cartTotal =
document.getElementById("cart-total");



if(!cartItems) return;



if(cart.length === 0){


cartItems.innerHTML =
"<p>Your cart is empty.</p>";


cartTotal.innerHTML =
"Total: ₦0";


return;


}



cartItems.innerHTML = "";

let total = 0;



cart.forEach((item,index)=>{


total += item.price * item.quantity;



cartItems.innerHTML += `

<div class="cart-item">


<h4>${item.name}</h4>


<p>
Colour: ${item.colour}
</p>


<p>
Size: ${item.size}
</p>


<p>
Qty: ${item.quantity}
</p>


<p>
₦${(item.price * item.quantity).toLocaleString()}
</p>



<button onclick="removeCartItem(${index})">

Remove

</button>


</div>

`;


});



cartTotal.innerHTML =
"Total: ₦" + total.toLocaleString();



updateCartCount();



}


// Continue in Part 2...
// ===============================
// REMOVE FROM CART
// ===============================

function removeCartItem(index){

  cart.splice(index,1);

  updateCart();

}

window.removeCartItem = removeCartItem;



// ===============================
// CART COUNT
// ===============================

function updateCartCount(){

  const count =
  document.getElementById("cart-count");


  if(count){

    let totalItems = 0;


    cart.forEach(item=>{

      totalItems += item.quantity;

    });


    count.innerText = totalItems;

  }

}



// ===============================
// PRODUCT POPUP
// ===============================


const popup =
document.getElementById("productPopup");


const popupImage =
document.getElementById("popupImage");


const popupTitle =
document.getElementById("popupTitle");


const popupPrice =
document.getElementById("popupPrice");



document.addEventListener("click", function(e){


if(e.target.classList.contains("product-image")){


const card =
e.target.closest(".product");


const name =
card.querySelector("h3").innerText;



const product =
products.find(item=>item.name === name);



if(product){


popupImage.src = product.image;


popupTitle.innerText =
product.name;


popupPrice.innerText =
"₦" + product.price.toLocaleString();



popup.style.display = "flex";


}


}


});



// Close popup


const closePopup =
document.querySelector(".close-popup");


if(closePopup){


closePopup.onclick = function(){


popup.style.display = "none";


};


}



window.onclick = function(e){


if(e.target === popup){

popup.style.display = "none";

}


};




// ===============================
// FAVORITES
// ===============================


document.addEventListener("click",function(e){


if(e.target.classList.contains("favorite")){


const id =
Number(e.target.dataset.id);



if(wishlist.includes(id)){


wishlist =
wishlist.filter(item=>item !== id);


e.target.innerHTML = "🤍";


}else{


wishlist.push(id);


e.target.innerHTML = "❤️";


}


}


});




// ===============================
// SEARCH
// ===============================


const searchInput =
document.getElementById("searchInput");



if(searchInput){


searchInput.addEventListener("input",function(){


const value =
searchInput.value.toLowerCase();



document.querySelectorAll(".product")
.forEach(product=>{


const text =
product.innerText.toLowerCase();



if(text.includes(value)){


product.style.display = "";


}else{


product.style.display = "none";


}



});


});


}




// ===============================
// CATEGORY FILTER
// ===============================


const filterButtons =
document.querySelectorAll(".filter-btn");



filterButtons.forEach(button=>{


button.addEventListener("click",function(){


const filter =
this.dataset.filter;



document.querySelectorAll(".product")
.forEach(product=>{


if(
filter === "all" ||
product.dataset.category === filter
){


product.style.display = "";


}else{


product.style.display = "none";


}



});


});


});




// ===============================
// CHECKOUT SCROLL
// ===============================


const checkoutBtn =
document.getElementById("checkoutBtn");



if(checkoutBtn){


checkoutBtn.addEventListener("click",function(){


document
.getElementById("checkout")
.scrollIntoView({

behavior:"smooth"

});


});


}




// ===============================
// WHATSAPP CHECKOUT
// ===============================


const orderForm =
document.getElementById("order-form");



if(orderForm){


orderForm.addEventListener("submit",function(e){


e.preventDefault();



const name =
document.getElementById("customerName").value;



const phone =
document.getElementById("customerPhone").value;



const address =
document.getElementById("customerAddress").value;



let message =
`Hello Fjs Kollection 💕%0A%0A`;



message +=
`Name: ${name}%0A`;

message +=
`Phone: ${phone}%0A`;

message +=
`Address: ${address}%0A%0A`;



message +=
`Order Details:%0A%0A`;



let total = 0;



cart.forEach(item=>{


message +=
`${item.name}%0A`;


message +=
`Colour: ${item.colour}%0A`;


message +=
`Size: ${item.size}%0A`;


message +=
`Quantity: ${item.quantity}%0A`;


message +=
`Price: ₦${item.price.toLocaleString()}%0A%0A`;



total +=
item.price * item.quantity;



});



message +=
`Total: ₦${total.toLocaleString()}%0A%0A`;

message +=
`Please send me the payment details. Thank you ❤️`;



window.open(

"https://wa.me/2348166061700?text=" + message,

"_blank"

);



});


}




// ===============================
// INITIAL CART LOAD
// ===============================


updateCart();
// ===== Track Order =====

const trackForm = document.getElementById("track-form");

if(trackForm){

trackForm.addEventListener("submit", function(e){

e.preventDefault();


const orderNumber = document.getElementById("orderNumber").value;


document.getElementById("order-result").innerHTML = `

<h3>Order Received ✅</h3>

<p>
Order Number: ${orderNumber}
</p>

<p>
Your order is being processed.
</p>

<p>
For delivery updates, contact Fjs Kollection on WhatsApp.
</p>

`;

});

}