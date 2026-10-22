const order =
    JSON.parse(localStorage.getItem("currentOrder")) || null;


const invoiceItems =
    document.getElementById("invoiceItems");

const subtotalElement =
    document.getElementById("subtotal");

const grandTotalElement =
    document.getElementById("grandTotal");

const discountRow =
    document.getElementById("discountRow");

const discountElement =
    document.getElementById("discount");

const orderIdElement =
    document.getElementById("orderId");

const dateElement =
    document.getElementById("date");


/* =========================
   CHECK ORDER
========================= */

if (!order) {

    invoiceItems.innerHTML = `
        <div class="invoice-empty">
            No order information found.
        </div>
    `;

    subtotalElement.innerText = "0.00";
    grandTotalElement.innerText = "0.00";

}
else {


    /* =========================
       CUSTOMER DETAILS
    ========================= */

    document.getElementById("customerName").innerText =
        order.customerName || "Customer";


    document.getElementById("customerPhone").innerText =
        order.customerPhone || "-";


    document.getElementById("customerAddress").innerText =
        order.customerAddress || "-";


    document.getElementById("paymentMethod").innerText =
        order.paymentMethod || "-";


    /* =========================
       ORDER DETAILS
    ========================= */

    orderIdElement.innerText =
        order.orderId || "N/A";


    dateElement.innerText =
        order.orderDate || "N/A";


    /* =========================
       PRODUCTS
    ========================= */

    let subtotal = 0;


    order.items.forEach(item => {

        const price =
            Number(item.price);

        const quantity =
            Number(item.qty);

        const itemTotal =
            price * quantity;

        subtotal += itemTotal;


        invoiceItems.innerHTML += `

            <div class="invoice-item">

                <div class="product-name">
                    ${item.name}
                </div>

                <div>
                    ₹${price.toFixed(2)}
                </div>

                <div>
                    ${quantity}
                </div>

                <div>
                    ₹${itemTotal.toFixed(2)}
                </div>

            </div>

        `;

    });


    /* =========================
       SUBTOTAL
    ========================= */

    subtotalElement.innerText =
        subtotal.toFixed(2);


    /* =========================
            DISCOUNT
    ========================= */

    const discount =
        Number(order.discount) || 0;

    if (discount > 0) {

        discountRow.style.display = "flex";

        discountElement.innerText =
            "₹" + discount.toFixed(2);

    }
    else {

        discountRow.style.display = "none";

    }


    /* =========================
       GRAND TOTAL
    ========================= */

    const finalTotal =
        subtotal - discount;


    grandTotalElement.innerText =
        finalTotal.toFixed(2);

}