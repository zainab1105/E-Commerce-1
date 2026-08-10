const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", function(event){

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if(!name || !email || !message){
            showToast("Please fill all fields.");
            return;
        }

        const messages =
            JSON.parse(localStorage.getItem("contactMessages")) || [];

        messages.push({
            name: name, 
            email: email,
            message: message,
            date: new Date().toLocaleString()
        });

        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );

        showToast("Message sent successfully! 📩");

        contactForm.reset();

    });

}