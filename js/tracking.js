const orderIdElement =
    document.getElementById("trackingOrderId");

const statusElement =
    document.getElementById("trackingStatus");

const trackingSteps =
    document.getElementById("trackingSteps");


// =========================
// GET ORDER ID FROM URL
// =========================

const params =
    new URLSearchParams(window.location.search);

const selectedOrderId =
    params.get("orderId");


// =========================
// FIND ORDER
// =========================

const allOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

const currentOrder =
    allOrders.find(
        order => order.orderId === selectedOrderId
    );


// =========================
// NO ORDER
// =========================

if (!currentOrder) {

    orderIdElement.innerText =
        "N/A";

    statusElement.innerText =
        "No order selected";

    trackingSteps.innerHTML = `

        <div class="tracking-empty">

            <h2>No Order Found 📦</h2>

            <p>
                Please select an order from My Orders.
            </p>

            <a href="orders.html">
                View My Orders
            </a>

        </div>

    `;

}


// =========================
// ORDER FOUND
// =========================

else {

    const orderId =
        currentOrder.orderId || "N/A";

    const status =
        currentOrder.status || "Confirmed";


    orderIdElement.innerText =
        orderId;

    statusElement.innerText =
        status;


    // =========================
    // TRACKING DATA
    // =========================

    const trackingData = [

        {
            title: "Order Confirmed",
            icon: "✓",
            description:
                "Your order has been confirmed."
        },

        {
            title: "Packed",
            icon: "📦",
            description:
                "Your package has been packed and is ready for shipping."
        },

        {
            title: "Shipped",
            icon: "🚚",
            description:
                "Your package is on its way."
        },

        {
            title: "Out for Delivery",
            icon: "🏠",
            description:
                "Your package is arriving soon."
        },

        {
            title: "Delivered",
            icon: "🎉",
            description:
                "Your package has been delivered."
        }

    ];


    // =========================
    // CURRENT STATUS
    // =========================

    let currentIndex = 0;

    if (status === "Confirmed") {
        currentIndex = 0;
    }

    if (status === "Packed") {
        currentIndex = 1;
    }

    if (status === "Shipped") {
        currentIndex = 2;
    }

    if (status === "Out for Delivery") {
        currentIndex = 3;
    }

    if (status === "Delivered") {
        currentIndex = 4;
    }


    // =========================
    // CREATE STEPS
    // =========================

    trackingSteps.innerHTML = "";


    trackingData.forEach(function(step, index) {

        const stepElement =
            document.createElement("div");

        stepElement.classList.add(
            "tracking-step"
        );


        if (index < currentIndex) {

            stepElement.classList.add(
                "completed"
            );

        }


        if (index === currentIndex) {

            stepElement.classList.add(
                "current"
            );

        }


        stepElement.innerHTML = `

            <div class="step-icon">
                ${step.icon}
            </div>

            <div class="step-content">

                <h3>
                    ${step.title}
                </h3>

                <p>
                    ${step.description}
                </p>

            </div>

        `;


        trackingSteps.appendChild(
            stepElement
        );


        // Line between steps

        if (index < trackingData.length - 1) {

            const line =
                document.createElement("div");

            line.classList.add(
                "tracking-line"
            );


            if (index < currentIndex) {

                line.classList.add(
                    "completed-line"
                );

            }


            trackingSteps.appendChild(
                line
            );

        }

    });

}