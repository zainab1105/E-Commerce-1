const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim().toLowerCase();

        const phone =
            document.getElementById("signupPhone").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("signupConfirm").value;


        // Phone validation
        if (!/^\d{10}$/.test(phone)) {

            alert("Please enter a valid 10-digit phone number.");

            return;
        }


        // Password validation
        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;
        }


        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        // Get existing users
        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        // Check duplicate email
        const existingUser = users.find(
            user => user.email === email
        );


        if (existingUser) {

            alert("An account with this email already exists.");

            return;
        }


        // Create user
        const user = {

            name: name,
            email: email,
            phone: phone,
            password: password

        };


        users.push(user);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        alert("Account created successfully! 🎉");

        window.location.href = "login.html";

    });

}   