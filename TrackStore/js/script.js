const buttons = document.querySelectorAll(".add-cart");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCount.innerText = cart.length;

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {
            name: button.dataset.name,
            price: button.dataset.price,
            image: button.parentElement.querySelector("img").src
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        cartCount.innerText = cart.length;

        alert(product.name + " added to cart!");
    });

});

const hearts=document.querySelectorAll(".wishlist");

hearts.forEach(heart=>{

    heart.addEventListener("click",()=>{

        heart.classList.toggle("active");

        if(heart.classList.contains("active")){

            heart.innerHTML="❤";

        }else{

            heart.innerHTML="♡";

        }

    });

});

const search=document.querySelector(".search-section input");

const cards=document.querySelectorAll(".card");

search.addEventListener("keyup",()=>{

    let value=search.value.toLowerCase();

    cards.forEach(card=>{

        let title=card.querySelector("h3").innerText.toLowerCase();

        if(title.includes(value)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

let time = 6 * 60 * 60; // 6 hours

const countdown = document.getElementById("countdown");

setInterval(() => {

    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    countdown.innerHTML =
        String(hours).padStart(2, "0") + " : " +
        String(minutes).padStart(2, "0") + " : " +
        String(seconds).padStart(2, "0");

    if (time > 0) {
        time--;
    }

}, 1000);

const darkBtn = document.getElementById("darkMode");

if(darkBtn){

    darkBtn.onclick = () => {

        document.body.classList.toggle("dark");

    };

}

document.querySelectorAll(".card").forEach(card=>{

    const minus=card.querySelector(".minus");
    const plus=card.querySelector(".plus");
    const qty = card.querySelector(".qty");

    if(minus && plus){

        let count=1;

        plus.onclick=()=>{

            count++;

            qty.innerText=count;

        }

        minus.onclick=()=>{

            if(count>1){

                count--;

                qty.innerText=count;

            }

        }

    }

});