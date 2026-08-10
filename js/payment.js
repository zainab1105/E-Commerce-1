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


if (paymentText) {

    paymentText.innerText =
        selectedPayment || "Payment";

}


// UPI
if (selectedPayment === "UPI") {

    upiPayment.style.display = "block";
    cardPayment.style.display = "none";

}


// CARD
else if (selectedPayment === "Debit / Credit Card") {

    upiPayment.style.display = "none";
    cardPayment.style.display = "block";

}


// Unknown
else {

    upiPayment.style.display = "none";
    cardPayment.style.display = "none";

}


// Card inputs
const paymentCard =
    document.getElementById("paymentCard");

const expiry =
    document.getElementById("expiry");

const cvv =
    document.getElementById("cvv");


// Card number
if (paymentCard) {

    paymentCard.addEventListener("input", function () {

        this.value =
            this.value.replace(/\D/g, "");

    });

}


// Expiry
if (expiry) {

    expiry.addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        if (value.length > 2) {

            value =
                value.slice(0, 2) +
                "/" +
                value.slice(2, 4);

        }

        this.value = value;

    });

}


// CVV
if (cvv) {

    cvv.addEventListener("input", function () {

        this.value =
            this.value.replace(/\D/g, "");

    });

}


// Pay Now
if (payButton) {

    payButton.addEventListener("click", function () {


        // UPI
        if (selectedPayment === "UPI") {

            showToast(
                "Demo UPI payment successful! ✅"
            );

            setTimeout(() => {

                window.location.href =
                    "success.html";

            }, 1200);

            return;
        }


        // CARD
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


            if (
                card.length !== 16 ||
                !/^\d+$/.test(card)
            ) {

                showToast(
                    "Enter a valid 16-digit card number."
                );

                return;

            }


            if (
                !/^\d{2}\/\d{2}$/.test(expiryValue)
            ) {

                showToast(
                    "Enter expiry as MM/YY."
                );

                return;

            }


            if (
                cvvValue.length !== 3 ||
                !/^\d+$/.test(cvvValue)
            ) {

                showToast(
                    "Enter a valid 3-digit CVV."
                );

                return;

            }


            showToast(
                "Demo card payment successful! ✅"
            );


            setTimeout(() => {

                window.location.href =
                    "success.html";

            }, 1200);

        }

    });

}