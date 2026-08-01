const sizeButtons = document.querySelectorAll(".sizes button");

sizeButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        sizeButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

    });

});

let qty = 1;

const qtyText = document.getElementById("qty");

document.getElementById("plus").onclick=()=>{

    qty++;

    qtyText.innerText=qty;

}

document.getElementById("minus").onclick=()=>{

    if(qty>1){

        qty--;

        qtyText.innerText=qty;

    }

}

const mainImage = document.getElementById("mainImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(img => {

    img.addEventListener("click", () => {

        mainImage.src = img.src;

        thumbs.forEach(i => i.classList.remove("active-thumb"));

        img.classList.add("active-thumb");

    });

});