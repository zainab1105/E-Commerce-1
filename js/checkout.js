const checkoutForm = document.getElementById("checkoutForm");
const paymentMethod = document.getElementById("paymentMethod");

function continuePayment() {

    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    const method = paymentMethod.value;

    if (!method) {
        showToast("Please select a payment method.");
        return;
    }

    // Cash On Delivery
    if (method === "cod") {

        localStorage.setItem(
            "paymentMethod",
            "Cash On Delivery"
        );

        window.location.href = "success.html";
        return;
    }

    // UPI
    if (method === "upi") {

        localStorage.setItem(
            "paymentMethod",
            "UPI"
        );

        window.location.href = "payment.html";
        return;
    }

    // Debit / Credit Card
    if (method === "card") {

        localStorage.setItem(
            "paymentMethod",
            "Debit / Credit Card"
        );

        window.location.href = "payment.html";
        return;
    }
}