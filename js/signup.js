const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirm").value;

    if(password !== confirmPassword){

        alert("Passwords do not match!");

        return;
    }

    const user = {
        name: name,
        email: email,
        phone: phone,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");

    window.location.href = "login.html";

});