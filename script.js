// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");


// loading cart as empty
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  const addBtn = document.querySelectorAll(".add-to-cart-btn");
  addBtn.forEach(button => {
    button.addEventListener("click", (event) => {
      let productId = parseInt(event.target.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML=""; // clear exxisting cart

  if(cart.length === 0){
    cartList.innerHTML = "Your cart is empty!"
  } else {
    cart.forEach((item,index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name}-$${item.price} <button class="remove-from-cart-btn" data-id="${index}">Remove</button>`
      cartList.appendChild(li);
    });

    const removeBtn = document.querySelectorAll(".remove-from-cart-btn");

  removeBtn.forEach(button => {
    button.addEventListener("click" , (e) => {
      const itemIndex = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(itemIndex);
    });
  });

    
  }

}

// Add item to cart
function addToCart(productId) {
  const product = products.find((product) => product.id === productId);
  
  if(product){
    // we will check product is already present in cart or not?
    const cartItemIndex = cart.findIndex((item) => item.id === product.id);

    if(cartItemIndex === -1){
      cart.push(product);
    }

    sessionStorage.setItem("cart",JSON.stringify(cart));

    renderCart();
  }
}

// Remove item from cart
function removeFromCart(itemIndex) {
  cart.splice(itemIndex,1);
  sessionStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

clearBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
