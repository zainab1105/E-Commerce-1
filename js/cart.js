let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");

let total = 0;

if(cart.length === 0){

    cartItems.innerHTML = `
    
    <div style="text-align:center; padding:80px;">

        <h2>Your Cart is Empty 🛒</h2>

        <p style="margin:20px 0;">
            Looks like you haven't added anything yet.
        </p>

        <a href="index.html"
        style="
        background:#00c853;
        color:white;
        padding:15px 30px;
        border-radius:8px;
        text-decoration:none;
        ">
        Continue Shopping
        </a>

    </div>
    
    `;

}
else{

    cart.forEach((item,index)=>{

        total += Number(item.price);

        cartItems.innerHTML += `
        <div class="cart-card">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h2>${item.name}</h2>

                <p>₹${item.price}</p>



                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>
        `;

    });

    cartItems.innerHTML += `
        <div class="cart-summary">

            <h2>Subtotal : ₹${total}</h2>

            <h3>Delivery : FREE</h3>

            <hr>

            <h1>Grand Total : ₹${total}</h1>

            <button id="checkoutBtn">
            Proceed to Checkout
            </button>

            <button id="orderBtn">
            Order on WhatsApp
            </button>

        </div>

        <button id="orderBtn">
            Order on WhatsApp
        </button>
    `;
}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    location.reload();

}

document.addEventListener("click",function(e){

    if(e.target.id==="orderBtn"){

        let message="Hello, I want to order:%0A%0A";

        cart.forEach(item=>{

            message+=`${item.name} - ₹${item.price}%0A`;

        });

        message+=`%0ATotal = ₹${total}`;

        window.open("https://wa.me/919876543210?text="+message);

    }

});

document.addEventListener("click", function(e){

    if(e.target.id==="checkoutBtn"){
        window.location.href="checkout.html";
    }

});