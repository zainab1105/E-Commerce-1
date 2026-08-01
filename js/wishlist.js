const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const container = document.getElementById("wishlist-items");

if(wishlist.length===0){

    container.innerHTML="<h2>Your Wishlist is Empty ❤️</h2>";

}

else{

wishlist.forEach((item,index)=>{

container.innerHTML += `

<div class="wishlist-card">

<img src="${item.image}" class="wish-img">

<div class="wish-info">

<h2>${item.name}</h2>

<p class="wish-price">₹${item.price}</p>

<div class="wish-buttons">

<button class="add-btn"
onclick="addToCart(${index})">
Add to Cart
</button>

<button class="remove-btn"
onclick="removeWish(${index})">
Remove
</button>

</div>

</div>

</div>

`;

});

}

function removeWish(index){

wishlist.splice(index,1);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

location.reload();

}

function addToCart(index){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push(wishlist[index]);

localStorage.setItem("cart",JSON.stringify(cart));

alert("Added to Cart!");

}