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

        total += Number(item.price) * item.qty;

        cartItems.innerHTML += `
        <div class="cart-card">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h2>${item.name}</h2>

                <p>
                    Price: ₹${item.price}<br>
                    Quantity: ${item.qty}<br>
                    Subtotal: ₹${item.price * item.qty}
                </p>

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

            <div id="discountDisplay"></div>

            <hr>

            <h1 id="cartGrandTotal">
                Grand Total : ₹${total}
            </h1>

            <button id="checkoutBtn">
                Proceed to Checkout
            </button>

            <button id="orderBtn">
                Order on WhatsApp
            </button>

        </div>
    `;
}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    location.reload();

}

document.addEventListener("click", function(e){

    if(e.target.id === "orderBtn"){

        alert("WhatsApp ordering is not available in this demo. 📱");

    }

});

document.addEventListener("click", function(e){

    if(e.target.id==="checkoutBtn"){
        window.location.href="checkout.html";
    }

});

const applyBtn = document.getElementById("applyCoupon");

if(applyBtn){

    applyBtn.onclick = () => {

        const code = document
            .getElementById("coupon")
            .value
            .trim()
            .toUpperCase();

        const msg = document.getElementById("coupon-msg");

        if(code === "TRACK10"){

    const discount = total * 0.10;
    const finalTotal = total - discount;

    localStorage.setItem(
        "discount",
        discount.toFixed(2)
    );

    localStorage.setItem(
        "finalTotal",
        finalTotal.toFixed(2)
    );

    msg.innerHTML =
        "✅ Coupon Applied!<br>" +
        "Discount: ₹" + discount.toFixed(0) +
        "<br><br><h2>Final Total : ₹" +
        finalTotal.toFixed(0) +
        "</h2>";

    msg.style.color = "#00c853";


    // UPDATE CART SUMMARY
    const discountDisplay =
        document.getElementById("discountDisplay");

    const cartGrandTotal =
        document.getElementById("cartGrandTotal");

    if(discountDisplay){
        discountDisplay.innerHTML =
            `<h3>Discount : -₹${discount.toFixed(0)}</h3>`;
    }

    if(cartGrandTotal){
        cartGrandTotal.innerText =
            "Grand Total : ₹" + finalTotal.toFixed(0);
    }

}

        else{

            localStorage.removeItem("discount");
            localStorage.removeItem("finalTotal");

            msg.innerHTML = "❌ Invalid Coupon";
            msg.style.color = "red";

        }

    };

}