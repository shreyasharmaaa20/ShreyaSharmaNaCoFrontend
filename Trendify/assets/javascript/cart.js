document.addEventListener("DOMContentLoaded", function () {  
    displayCart();
});

// Event delegation: Prevent duplicate listeners
document.getElementById("cart-items").addEventListener("click", function (event) {
    let index = parseInt(event.target.dataset.index);
    
    if (event.target.classList.contains("increase")) {
        changeQuantity(index, 1);
    } else if (event.target.classList.contains("decrease")) {
        changeQuantity(index, -1);
    } else if (event.target.classList.contains("remove-btn")) {
        removeFromCart(index);
    }
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let proceedButton = document.getElementById("proceed-btn");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `<tr><td colspan="5">Your cart is empty.</td></tr>`;
        totalPriceElement.innerText = "$0.00";
        proceedButton.style.display = "none";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        if (isNaN(item.quantity) || item.quantity < 1) {
            item.quantity = 1;
        }

        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.title}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="quantity-btn decrease" data-index="${index}">-</button>
                <span class="quantity" id="quantity-${index}">${item.quantity}</span>
                <button class="quantity-btn increase" data-index="${index}">+</button>
            </td>
            <td class="item-total" id="item-total-${index}">$${itemTotal.toFixed(2)}</td>
            <td><button class="btn btn-danger remove-btn" data-index="${index}">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    totalPriceElement.innerText = `$${total.toFixed(2)}`;
    proceedButton.style.display = "block";
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {
        cart[index].quantity = Math.max(1, cart[index].quantity + change);  // Prevent negative quantity
        localStorage.setItem("cart", JSON.stringify(cart));

        // Directly update UI instead of reloading entire table
        document.getElementById(`quantity-${index}`).innerText = cart[index].quantity;
        document.getElementById(`item-total-${index}`).innerText = `$${(cart[index].quantity * cart[index].price).toFixed(2)}`;
        
        updateTotal();
        showCartMessage("Quantity updated!");
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        showCartMessage("Item removed!");
    }
}

function updateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPriceElement = document.getElementById("total-price");

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

// Function to handle "Proceed to Payment" button click
function proceedToPayment() {
    alert("Redirecting to payment page... (Implement payment gateway)");

}
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
