const cart = JSON.parse(localStorage.getItem("cart")) || [];

const invoiceItems = document.getElementById("invoiceItems");
const grandTotal = document.getElementById("grandTotal");
const orderId = document.getElementById("orderId");
const date = document.getElementById("date");

let total = 0;

// Random Order ID
orderId.innerText = "TP" + Math.floor(Math.random() * 1000000);

// Today's Date
date.innerText = new Date().toLocaleDateString();

cart.forEach(item => {

    const subtotal = Number(item.price) * Number(item.qty);

    total += subtotal;

    invoiceItems.innerHTML += `
        <div class="invoice-item">
            <h3>${item.name}</h3>
            <p>
                ₹${item.price} × ${item.qty} = ₹${subtotal}
            </p>
            <hr>
        </div>
    `;

});

grandTotal.innerText = total;