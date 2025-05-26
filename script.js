const products = [
  { id: 1, name: "Smartphone", category: "electronics", price: 699 },
  { id: 2, name: "T-shirt", category: "clothing", price: 25 },
  { id: 3, name: "Laptop", category: "electronics", price: 1200 },
  { id: 4, name: "Novel", category: "books", price: 15 },
  { id: 5, name: "Jeans", category: "clothing", price: 40 },
  { id: 6, name: "Tablet", category: "electronics", price: 499 },
];

const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById("category");
const sortOption = document.getElementById("sort");

const cart = [];
const cartSection = document.getElementById("cart");
const cartItemsList = document.getElementById("cart-items");
const totalText = document.getElementById("total");
const toggleCartBtn = document.getElementById("toggle-cart");
const checkoutBtn = document.getElementById("checkout-btn");

// Render product cards with Add to Cart button
function displayProducts(items) {
  productList.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Add product to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

// Update cart UI
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItemsList.appendChild(li);
    total += item.price;
  });
  totalText.textContent = `Total: ₹${total}`;
}

// Filter and sort products based on controls
function filterAndSortProducts() {
  let filtered = [...products];
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }
  const selectedSort = sortOption.value;
  if (selectedSort === "low-to-high") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "high-to-low") {
    filtered.sort((a, b) => b.price - a.price);
  }
  displayProducts(filtered);
}

// Event listeners
categoryFilter.addEventListener("change", filterAndSortProducts);
sortOption.addEventListener("change", filterAndSortProducts);

toggleCartBtn.addEventListener("click", () => {
  cartSection.style.display = cartSection.style.display === "block" ? "none" : "block";
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your order!");
  cart.length = 0;
  updateCart();
  cartSection.style.display = "none";
});

// Initial display
displayProducts(products);
