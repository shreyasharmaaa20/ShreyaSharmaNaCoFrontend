document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
          // event listener for form submission
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            // Password validation: At least 8 characters and contains a number
            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }
            if (!/\d/.test(password)) {  // Checks if at least one number is present
                alert("Password must contain at least one number.");
                return;
            }

            //  Temporary login check
            if (email === "user@example.com" && password === "password123") {
                localStorage.setItem("user", JSON.stringify({ email }));
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to homepage
            } else {
                alert("Invalid credentials. Try again.");
            }
        });
    }
});
