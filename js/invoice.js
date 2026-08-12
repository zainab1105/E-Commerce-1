const cart = JSON.parse(localStorage.getItem("cart")) || [];

const invoiceItems = document.getElementById("invoiceItems");
const grandTotal = document.getElementById("grandTotal");
const orderId = document.getElementById("orderId");
const date = document.getElementById("date");

let total = 0;


// Keep the same Order ID after refresh
let savedOrderId = localStorage.getItem("orderId");

if (!savedOrderId) {

    savedOrderId =
        "TP" + Math.floor(100000 + Math.random() * 900000);

    localStorage.setItem("orderId", savedOrderId);
}

orderId.innerText = savedOrderId;


// Date
let orderDate = localStorage.getItem("orderDate");

if (!orderDate) {

    orderDate = new Date().toLocaleDateString();

    localStorage.setItem("orderDate", orderDate);
}

date.innerText = orderDate;


// Invoice items
if (cart.length === 0) {

    invoiceItems.innerHTML = `
        <p class="empty-invoice">
            No items found for this order.
        </p>
    `;

} else {

    cart.forEach(item => {

        const quantity = Number(item.qty) || 1;
        const price = Number(item.price) || 0;
        const subtotal = price * quantity;

        total += subtotal;

        invoiceItems.innerHTML += `
            <div class="invoice-item">

                <div>
                    <h3>${item.name}</h3>

                    <p>
                        ₹${price.toFixed(2)}
                        × ${quantity}
                    </p>
                </div>

                <strong>
                    ₹${subtotal.toFixed(2)}
                </strong>

            </div>
        `;

    });

}

grandTotal.innerText = total.toFixed(2);