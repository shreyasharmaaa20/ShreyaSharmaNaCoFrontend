document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("product");

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                document.getElementById("detail-image").src = product.image;
                document.getElementById("detail-title").textContent = product.title;
                document.getElementById("detail-category").textContent = `Category: ${product.category}`;
                document.getElementById("detail-price").textContent = `$${product.price.toFixed(2)}`;
                document.getElementById("detail-description").textContent = product.description;

                document.getElementById("addToCart").addEventListener("click", () => {
                    addToCart(product.id, product.title, product.price);
                });
            })
            .catch(error => console.error("Error loading product:", error));
    }

    document.getElementById("back-to-home").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});

// Function to add item to cart (localStorage)
function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
}
