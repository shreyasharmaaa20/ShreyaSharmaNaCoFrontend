document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `<tr><td colspan="3">Your cart is empty.</td></tr>`;
        return;
    }

    cart.forEach((item, index) => {
        let row = `<tr>
            <td>${item.title}</td>
            <td>$${item.price}</td>
            <td><button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
        cartItems.innerHTML += row;
    });
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
