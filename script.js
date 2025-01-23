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

let cart=sessionStorage.getItem('cart') ||[];
	if(cart.length){
		cart=JSON.parse(cart);
	}
// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
	document.querySelectorAll('.add-to-cart-btn').forEach((btn)=>{
		btn.addEventListener('click',()=>addToCart(btn.getAttribute('data-id')))
	});
}

// Render cart list
function renderCart() {
	let ul=document.querySelector('#cart-list');
	ul.innerHTML=``;
	cart.forEach((product)=>{
		ul.innerHTML+=`<li>${product.name} - $${product.price}</li>`
	})
	
}

// Add item to cart
function addToCart(productId) {
	let product=products[productId-1];
	cart.push(product);
	sessionStorage.setItem('cart',JSON.stringify(cart));
	renderCart();
}

// Remove item from cart
function removeFromCart(productId) {}

// Clear cart
function clearCart() {
	cart.length=0;
	sessionStorage.setItem('cart',JSON.stringify(cart));
	renderCart();
}
 
// Initial render
renderProducts();
renderCart();