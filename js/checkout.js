const checkoutForm = document.getElementById("checkoutForm");
const paymentMethod = document.getElementById("paymentMethod");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // =========================
        // VALIDATE FORM
        // =========================

        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }

        const method = paymentMethod.value;

        if (!method) {
            alert("Please select a payment method.");
            return;
        }


        // =========================
        // CUSTOMER DETAILS
        // =========================

        const customerName =
            document.getElementById("fullName").value.trim();

        const customerPhone =
            document.getElementById("phone").value.trim();

        const customerAddress =
            document.getElementById("address").value.trim();


        localStorage.setItem(
            "customerName",
            customerName
        );

        localStorage.setItem(
            "customerPhone",
            customerPhone
        );

        localStorage.setItem(
            "customerAddress",
            customerAddress
        );


        // =========================
        // CURRENT USER
        // =========================

        const currentUser =
            JSON.parse(localStorage.getItem("currentUser"));


        const customerEmail =
            currentUser ? currentUser.email : "";


        // =========================
        // CREATE ORDER ID
        // =========================

        const orderId =
            "TP" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        const orderDate =
            new Date().toLocaleDateString("en-IN");


        localStorage.setItem(
            "orderId",
            orderId
        );

        localStorage.setItem(
            "orderDate",
            orderDate
        );


        // =========================
        // GET CART
        // =========================

        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];


        // =========================
        // DISCOUNT
        // =========================

        const discount =
            Number(
                localStorage.getItem("discount")
            ) || 0;


        // =========================
        // PAYMENT METHOD
        // =========================

        let paymentText = "";

        if (method === "cod") {

            paymentText = "Cash On Delivery";

        }

        else if (method === "upi") {

            paymentText = "UPI";

        }

        else if (method === "card") {

            paymentText = "Debit / Credit Card";

        }


        localStorage.setItem(
            "paymentMethod",
            paymentText
        );


        // =========================
        // CREATE ORDER OBJECT
        // =========================

        const order = {

            orderId: orderId,

            orderDate: orderDate,

            customerName: customerName,

            customerPhone: customerPhone,

            customerAddress: customerAddress,

            customerEmail: customerEmail,

            paymentMethod: paymentText,

            items: cart,

            discount: discount,

            status: "Confirmed"

        };


        // =========================
        // SAVE ORDER
        // =========================

        const allOrders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        allOrders.push(order);


        localStorage.setItem(
            "orders",
            JSON.stringify(allOrders)
        );


        // =========================
        // CASH ON DELIVERY
        // =========================

        if (method === "cod") {

            window.location.href =
                "success.html";

            return;
        }


        // =========================
        // UPI
        // =========================

        if (method === "upi") {

            window.location.href =
                "payment.html";

            return;
        }


        // =========================
        // CARD
        // =========================

        if (method === "card") {

            window.location.href =
                "payment.html";

            return;
        }

    });

}