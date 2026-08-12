const buttons = document.querySelectorAll(".add-cart");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartCount.innerText = cart.length;

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const qty = Number(
            button.parentElement.querySelector(".qty").innerText
        );

        const product = {
            name: button.dataset.name,
            price: button.dataset.price,
            image: button.parentElement.querySelector("img").src,
            qty: qty
        };

        const existingProduct = cart.find(
            item => item.name === product.name
        );

        if (existingProduct) {

            existingProduct.qty += product.qty;

        } else {

            cart.push(product);

        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        cartCount.innerText = cart.reduce(
            (total, item) => total + Number(item.qty),
            0
        );

        showToast(product.name + " added to cart!");

    });

});

const hearts = document.querySelectorAll(".wishlist");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistCount = document.getElementById("wishlist-count");

if(wishlistCount){
    wishlistCount.innerText = wishlist.length;
}

hearts.forEach(heart => {

    const card = heart.closest(".card");

    const button = card.querySelector(".add-cart");

    const productName = button.dataset.name;

    // Keep heart red after refresh
    if(wishlist.some(item => item.name === productName)){
        heart.innerHTML = "❤";
        heart.classList.add("active");
    }

    heart.addEventListener("click", () => {

        const product = {
            name: button.dataset.name,
            price: button.dataset.price,
            image: card.querySelector("img").src
        };

        const index = wishlist.findIndex(
            item => item.name === product.name
        );

        if(index === -1){

            wishlist.push(product);

            heart.innerHTML = "❤";
            heart.classList.add("active");

        }else{

            wishlist.splice(index, 1);

            heart.innerHTML = "♡";
            heart.classList.remove("active");

        }

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        if(wishlistCount){
            wishlistCount.innerText = wishlist.length;
        }

    });

});

const search = document.querySelector(".search-section input");
const cards = document.querySelectorAll(".card");

if(search){

    search.addEventListener("keyup", () => {

        let value = search.value.toLowerCase();

        cards.forEach(card => {

            const titleElement = card.querySelector("h3");

            if(!titleElement) return;

            let title = titleElement.innerText.toLowerCase();

            if(title.includes(value)){
                card.style.display = "block";
            }else{
                card.style.display = "none";
            }

        });

    });

}

const countdown = document.getElementById("countdown");

if(countdown){

    let time = 6 * 60 * 60;

    setInterval(() => {

        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        countdown.innerHTML =
            String(hours).padStart(2, "0") + " : " +
            String(minutes).padStart(2, "0") + " : " +
            String(seconds).padStart(2, "0");

        if(time > 0){
            time--;
        }

    }, 1000);

}

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

const filterButtons = document.querySelectorAll(".categories button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});

const sort = document.getElementById("sort");

if(sort){

    sort.addEventListener("change", ()=>{

        const products = document.querySelector(".products");
        const cards = [...document.querySelectorAll(".products .card")];

        if(sort.value === "low"){

            cards.sort((a,b)=>{

                return Number(a.querySelector(".add-cart").dataset.price) -
                       Number(b.querySelector(".add-cart").dataset.price);

            });

        }

        else if(sort.value === "high"){

            cards.sort((a,b)=>{

                return Number(b.querySelector(".add-cart").dataset.price) -
                       Number(a.querySelector(".add-cart").dataset.price);

            });

        }

        else if(sort.value === "name"){

            cards.sort((a,b)=>{

                return a.querySelector("h3").innerText.localeCompare(
                       b.querySelector("h3").innerText);

            });

        }

        cards.forEach(card=>products.appendChild(card));

    });

}

function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerText = "✅ " + message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

const slider=document.getElementById("sliderImage");

if(slider){

const images=[
"images/tt-1.jpg",
"images/tt-2.jpg",
"images/tt-3.jpg",
"images/tt-4.jpg",
"images/tt-5.jpg"
];

let i=0;

setInterval(()=>{

i++;

if(i>=images.length){
i=0;
}

slider.src=images[i];

},2500);

}

const subscribeForm = document.getElementById("subscribeForm");

if(subscribeForm){

    subscribeForm.addEventListener("submit", function(event){

        event.preventDefault();

        const email = document
            .getElementById("subscriberEmail")
            .value
            .trim()
            .toLowerCase();

        if(!email){
            showToast("Please enter your email.");
            return;
        }

        const subscribers =
            JSON.parse(localStorage.getItem("subscribers")) || [];

        if(subscribers.includes(email)){

            showToast("You're already subscribed! 💚");

            return;
        }

        subscribers.push(email);

        localStorage.setItem(
            "subscribers",
            JSON.stringify(subscribers)
        );

        showToast("Subscribed successfully! 🎉");

        subscribeForm.reset();

    });

}