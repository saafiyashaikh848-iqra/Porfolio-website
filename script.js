 // 1. SHOP NOW BUTTON

const shopButton = document.getElementById("shop-now");

shopButton.addEventListener("click", function() {

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

});


// 2. SHOPPING CART

let cart = [];


// Add product to cart

function addCart(productName) {

    const existingProduct = cart.find(function(item) {
        return item.name === productName;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            quantity: 1
        });

    }

    updateCart();

    alert(productName + " added to your cart! 🛍️");

}


// 3. UPDATE CART DISPLAY

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.textContent = "Your cart is empty.";

    }


    cart.forEach(function(item, index) {

        totalItems += item.quantity;

        let price = getPrice(item.name);

        totalPrice += price * item.quantity;


        const itemDiv = document.createElement("div");

        itemDiv.className = "cart-item";


        itemDiv.innerHTML = `
            <span>
                ${item.name} × ${item.quantity}
                — ₹${price * item.quantity}
            </span>

            <button class="remove-btn" data-index="${index}">
                Remove
            </button>
        `;


        cartItems.appendChild(itemDiv);

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent = totalPrice;

}


// 4. PRODUCT PRICES

function getPrice(productName) {

    const prices = {
        "Makeup Kit": 799,
        "Lipstick": 399,
        "Face Cream": 599
    };

    return prices[productName] || 0;

}


// 5. ADD TO CART BUTTONS

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const productName = button.dataset.name;

        addCart(productName);

    });

});


// 6. REMOVE PRODUCT FROM CART

document.getElementById("cart-items").addEventListener("click", function(event) {

    if (event.target.classList.contains("remove-btn")) {

        const index = Number(event.target.dataset.index);

        cart.splice(index, 1);

        updateCart();

    }

});


// 7. PRODUCT SEARCH

const searchInput = document.getElementById("search-input");

const products = document.querySelectorAll(".product");


function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const activeCategory = document.querySelector(".filter-btn.active").dataset.category;

    let visibleProducts = 0;


    products.forEach(function(product) {

        const productName = product.querySelector("h3").textContent.toLowerCase();

        const category = product.dataset.category;

        const matchesSearch = productName.includes(searchText);

        const matchesCategory =
            activeCategory === "all" || category === activeCategory;


        if (matchesSearch && matchesCategory) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    document.getElementById("no-results").style.display =
        visibleProducts === 0 ? "block" : "none";

}


searchInput.addEventListener("input", filterProducts);


// 8. CATEGORY FILTER

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterProducts();

    });

});


// 9. WISHLIST

let wishlist = [];


const wishlistButtons = document.querySelectorAll(".wishlist-btn");

wishlistButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = button.closest(".product");

        const productName = product.querySelector("h3").textContent;


        if (wishlist.includes(productName)) {

            wishlist = wishlist.filter(function(item) {
                return item !== productName;
            });

            button.classList.remove("active");

            button.textContent = "♡ Add to Wishlist";

        } else {

            wishlist.push(productName);

            button.classList.add("active");

            button.textContent = "♥ Added to Wishlist";

        }


        document.getElementById("wishlist-count").textContent =
            wishlist.length;

    });

});