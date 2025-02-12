document.addEventListener("DOMContentLoaded", function () {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
            setupCategoryFilter(data);
        })
        .catch(error => console.error("Error fetching products:", error));

        updateCartCount();
});

// Function to display products
function displayProducts(products) {
    let productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        let category = product.category.toLowerCase();
        let displayCategory = category.includes("jewelery") || category.includes("electronics") ? "accessories" : category;

        let productCard = document.createElement("div");
        productCard.className = `col-md-4 product-item ${displayCategory}`;

        productCard.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 80)}...</p>
                <div class="price">$${product.price}</div>
                <button class="btn btn-success addToCart" onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
            </div>`;

        productList.appendChild(productCard);
    });
}

// Function to filter products
function setupCategoryFilter(products) {
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", function () {
            let selectedCategory = this.getAttribute("data-category");

            let filteredProducts = products.filter(product => {
                let cat = product.category.toLowerCase();
                if (selectedCategory === "all") {
                    return true;
                } else if (selectedCategory === "accessories") {
                    return cat.includes("jewelery") || cat.includes("electronics");
                } else {
                    return cat === selectedCategory;
                }
            });

            displayProducts(filteredProducts);
        });
    });
}

// Function to add items to cart
function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, title, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}
