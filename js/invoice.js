const cart = JSON.parse(localStorage.getItem("cart")) || [];

const invoiceItems = document.getElementById("invoiceItems");
const grandTotal = document.getElementById("grandTotal");
const orderId = document.getElementById("orderId");
const date = document.getElementById("date");

let subtotal = 0;

// Order ID
orderId.innerText =
    "TP" + Math.floor(100000 + Math.random() * 900000);

// Date
date.innerText = new Date().toLocaleDateString();


// Display products
cart.forEach(item => {

    const itemTotal =
        Number(item.price) * Number(item.qty);

    subtotal += itemTotal;

    invoiceItems.innerHTML += `
        <div class="invoice-item">

            <h3>${item.name}</h3>

            <p>
                ₹${item.price} × ${item.qty}
            </p>

            <strong>
                ₹${itemTotal.toFixed(2)}
            </strong>

            <hr>

        </div>
    `;
});


// Get coupon information
const savedDiscount =
    Number(localStorage.getItem("discount")) || 0;

const savedFinalTotal =
    localStorage.getItem("finalTotal");


// Use discounted total if coupon was applied
const finalTotal =
    savedFinalTotal !== null
        ? Number(savedFinalTotal)
        : subtotal;


// Show discount if applied
if(savedDiscount > 0){

    invoiceItems.innerHTML += `
        <div class="invoice-discount">

            <h3>
                Subtotal : ₹${subtotal.toFixed(2)}
            </h3>

            <h3>
                Discount : -₹${savedDiscount.toFixed(2)}
            </h3>

            <hr>

        </div>
    `;
}


// Show final amount
grandTotal.innerText =
    finalTotal.toFixed(2);

// Clear coupon data after invoice uses it
localStorage.removeItem("discount");
localStorage.removeItem("finalTotal");