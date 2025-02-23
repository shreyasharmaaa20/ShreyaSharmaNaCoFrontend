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
    let productDetail = document.getElementById("product-detail");
    let productListSection = document.getElementById("products");
    productList.innerHTML = "";

    products.forEach(product => {
        let category = product.category.toLowerCase();
        let displayCategory = category.includes("jewelery") || category.includes("electronics") ? "accessories" : category;

        let productCard = document.createElement("div");
        productCard.className = `col-md-4 product-item ${displayCategory}`;
        productCard.setAttribute("data-id", product.id);

        productCard.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 80)}...</p>
                <div class="price">$${product.price}</div>
                <button class="btn btn-success addToCart">Add to Cart</button>
            </div>`;

        // Attach event listener to product card for details
        productCard.addEventListener("click", function (event) {
            if (!event.target.classList.contains("addToCart")) {
                showProductDetail(product);
            }
        });

        // Attach event listener to "Add to Cart" button
        productCard.querySelector(".addToCart").addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent triggering product details
            addToCart(product.id, product.title, product.price);
        });

        productList.appendChild(productCard);
    });
}

// Function to show product details
function showProductDetail(product) {
    let productDetail = document.getElementById("product-detail");
    let productListSection = document.getElementById("products");

    productDetail.innerHTML = `
        <div class="container mt-5">
            <button id="back-to-products" class="btn btn-outline-danger mb-3">← Back to Products</button>
            <div class="row align-items-center">
                <div class="col-md-6 text-center">
                    <img src="${product.image}" alt="${product.title}" class="img-fluid product-img">
                </div>
                <div class="col-md-6">
                    <h2>${product.title}</h2>
                    <p class="text-muted">${product.category}</p>
                    <p class="text-danger">$${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                </div>
            </div>
        </div>`;

    document.getElementById("back-to-products").addEventListener("click", () => {
        productDetail.style.display = "none";
        productListSection.style.display = "block";
    });

    productDetail.style.display = "block";
    productListSection.style.display = "none";
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

    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCartMessage("Item added to cart!");
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Function to show cart message (toast notification)
function showCartMessage(message) {
    let toast = document.createElement("div");
    toast.classList.add("toast-message");
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}
