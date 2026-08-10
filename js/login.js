const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if(!savedUser){

        alert("No account found. Please sign up first.");

        return;
    }

    if(
        email === savedUser.email &&
        password === savedUser.password
    ){

        localStorage.setItem("loggedIn", "true");

        alert("Login successful!");

        window.location.href = "index.html";

    }else{

        alert("Incorrect email or password.");

    }

});