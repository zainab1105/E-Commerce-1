const allOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

const container =
    document.getElementById("ordersContainer");


// =========================
// GET LOGGED-IN USER
// =========================

const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));


// If nobody is logged in
if (!currentUser) {

    container.innerHTML = `

        <div class="orders-empty">

            <h2>Please Login 👤</h2>

            <p>
                Login to view your orders.
            </p>

            <a href="login.html">
                Login
            </a>

        </div>

    `;

}


// =========================
// FILTER USER ORDERS
// =========================

else {

    const userOrders =
    allOrders.filter(order =>

        order.customerEmail === currentUser.email ||

        (
            !order.customerEmail &&
            order.customerPhone === currentUser.phone
        )

    );


    // =========================
    // NO ORDERS
    // =========================

    if (userOrders.length === 0) {

        container.innerHTML = `

            <div class="orders-empty">

                <h2>No Orders Yet 🛍️</h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a href="shop.html">
                    Start Shopping
                </a>

            </div>

        `;

    }


    // =========================
    // DISPLAY ORDERS
    // =========================

    else {

        userOrders
            .slice()
            .reverse()
            .forEach(order => {

                let total = 0;


                order.items.forEach(item => {

                    total +=
                        Number(item.price) *
                        Number(item.qty);

                });


                total -=
                    Number(order.discount) || 0;


                container.innerHTML += `

                    <div class="order-card">

                        <div class="order-top">

                            <div>

                                <h2>
                                    Order #${order.orderId}
                                </h2>

                                <p>
                                    ${order.orderDate}
                                </p>

                            </div>

                            <span class="order-status">
                                Confirmed
                            </span>

                        </div>


                        <div class="order-info">

                            <p>
                                <strong>Payment:</strong>
                                ${order.paymentMethod}
                            </p>

                            <p>
                                <strong>Items:</strong>
                                ${order.items.length}
                            </p>

                            <p>
                                <strong>Total:</strong>
                                ₹${total.toFixed(2)}
                            </p>

                        </div>


                        <div class="order-buttons">

                            <a
                                href="invoice.html"
                                onclick="
                                    localStorage.setItem(
                                        'currentOrder',
                                        JSON.stringify(${JSON.stringify(order)})
                                    );
                                "
                            >
                                View Invoice
                            </a>

                            <a href="tracking.html?orderId=${encodeURIComponent(order.orderId)}">
                                Track Order
                            </a>

                        </div>

                    </div>

                `;

            });

    }

}