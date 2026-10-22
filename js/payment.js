const selectedPayment =
    localStorage.getItem("paymentMethod");

const paymentText =
    document.getElementById("selectedPayment");

const upiPayment =
    document.getElementById("upiPayment");

const cardPayment =
    document.getElementById("cardPayment");

const payButton =
    document.getElementById("payButton");


// =========================
// PAYMENT METHOD
// =========================

if (paymentText) {

    paymentText.innerText =
        selectedPayment || "Payment";

}


// =========================
// SHOW PAYMENT SECTION
// =========================

if (selectedPayment === "UPI") {

    upiPayment.style.display = "block";
    cardPayment.style.display = "none";

}

else if (
    selectedPayment === "Debit / Credit Card"
) {

    upiPayment.style.display = "none";
    cardPayment.style.display = "block";

}

else {

    upiPayment.style.display = "none";
    cardPayment.style.display = "none";

}


// =========================
// CARD INPUTS
// =========================

const paymentCard =
    document.getElementById("paymentCard");

const expiry =
    document.getElementById("expiry");

const cvv =
    document.getElementById("cvv");


// Card number

if (paymentCard) {

    paymentCard.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 16);

        }
    );

}


// Expiry

if (expiry) {

    expiry.addEventListener(
        "input",
        function () {

            let value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 4);

            if (value.length > 2) {

                value =
                    value.slice(0, 2) +
                    "/" +
                    value.slice(2);

            }

            this.value = value;

        }
    );

}


// CVV

if (cvv) {

    cvv.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(/\D/g, "")
                    .slice(0, 3);

        }
    );

}


// =========================
// PAY NOW
// =========================

if (payButton) {

    payButton.addEventListener(
        "click",
        function () {


            // =====================
            // UPI
            // =====================

            if (selectedPayment === "UPI") {

                payButton.disabled = true;

                payButton.innerText =
                    "Processing...";

                setTimeout(function () {

                    window.location.href =
                        "success.html";

                }, 1200);

                return;
            }


            // =====================
            // CARD
            // =====================

            if (
                selectedPayment ===
                "Debit / Credit Card"
            ) {

                const card =
                    paymentCard.value.trim();

                const expiryValue =
                    expiry.value.trim();

                const cvvValue =
                    cvv.value.trim();


                // Card number

                if (
                    card.length !== 16 ||
                    !/^\d{16}$/.test(card)
                ) {

                    alert(
                        "Enter a valid 16-digit card number."
                    );

                    return;

                }


                // Expiry format

                if (
                    !/^\d{2}\/\d{2}$/.test(
                        expiryValue
                    )
                ) {

                    alert(
                        "Enter expiry as MM/YY."
                    );

                    return;

                }


                // Valid month

                const month =
                    Number(
                        expiryValue.substring(0, 2)
                    );

                if (
                    month < 1 ||
                    month > 12
                ) {

                    alert(
                        "Enter a valid expiry month."
                    );

                    return;

                }


                // CVV

                if (
                    !/^\d{3}$/.test(cvvValue)
                ) {

                    alert(
                        "Enter a valid 3-digit CVV."
                    );

                    return;

                }


                payButton.disabled = true;

                payButton.innerText =
                    "Processing...";


                setTimeout(function () {

                    window.location.href =
                        "success.html";

                }, 1200);

            }

        }
    );

}