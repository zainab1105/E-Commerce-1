const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim().toLowerCase();

        const password =
            document.getElementById("loginPassword").value;


        const users =
            JSON.parse(localStorage.getItem("users")) || [];


        if (users.length === 0) {

            alert("No account found. Please sign up first.");

            return;
        }


        const user = users.find(
            account =>
                account.email === email &&
                account.password === password
        );


        if (!user) {

            alert("Incorrect email or password.");

            return;
        }


        // Save logged-in user
        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );


        alert(
            "Welcome back, " +
            user.name +
            "! 🎉"
        );


        window.location.href = "index.html";

    });

}