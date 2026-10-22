const darkBtn = document.getElementById("darkMode");

if (darkBtn) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        darkBtn.innerText = "Light";
    } else {
        document.body.classList.remove("dark");
        darkBtn.innerText = "Dark";
    }

    darkBtn.onclick = () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkBtn.innerText = "Light";
        } else {
            localStorage.setItem("theme", "light");
            darkBtn.innerText = "Dark";
        }

    };

}