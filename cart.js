
// Buttons + and - to change quantity of goods
        const quantityButtons = document.querySelectorAll(".quantity-button");
    quantityButtons.forEach(button => {
        button.addEventListener("click", function() {
            const input = button.parentElement.querySelector(".quantity");
            let value = parseInt(input.value);

            if (button.classList.contains("plus")) {
                value++;
            } else if (button.classList.contains("minus")) {
                value = Math.max(1, value - 1);
            }

            input.value = value;
        });
    });

//cart variable
const cart = [];
const cartContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");



// function to update cart in real time
function updateCart() {
    cartContainer.innerHTML = ""; 

    let total = 0;

    for (const item of cart) {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" >
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">${item.price * item.quantity} грн</span>
            <input class="cart-item-quantity" type="number" value="${item.quantity}" min="1">
            <button class="remove-from-cart">Вилучити</button>
        `;

        cartContainer.appendChild(cartItem);

        // renew total cost of cart
        total += item.price * item.quantity;
    }
    var cart1 = document.getElementById("cart");
    var totalText1 = cart1.querySelector(".cart-total");
     if (totalText1) {
        totalText1.textContent = `Загальна сума: ${total} грн`;
    }const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

     const clearCartButton = document.getElementById("clear-cart");
    clearCartButton.addEventListener("click", function () {
        cart.length = 0; // clear cart array
        updateCart();
    });
}

// add goods to cart function
document.querySelector(".products").addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart")) {
        const product = event.target.parentElement;
        const productName = product.querySelector("h2").textContent;
        const productPrice = parseFloat(product.getAttribute("data-price"));
        const productQuantity = parseInt(product.querySelector(".quantity").value);
        const imgSrc = product.querySelector('img').src;

        const existingItem = cart.find((item) => item.name === productName);

        if (existingItem) {
            existingItem.quantity += productQuantity;
        } else {
            const cartItem = { name: productName, price: productPrice, quantity: productQuantity, image: imgSrc };
            cart.push(cartItem);
        }

        updateCart();
    }
});


// delete good from cart
document.getElementById("cart").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart")) {
        const itemIndex = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        cart.splice(itemIndex, 1); // Видаляємо товар з корзини
        updateCart();
    }
});

// renew cost of good in cart
document.getElementById("cart").addEventListener("input", (event) => {
    if (event.target.classList.contains("cart-item-quantity")) {
        const newQuantity = parseInt(event.target.value);
        const itemIndex = Array.from(event.target.parentElement.parentElement.children).indexOf(event.target.parentElement);
        cart[itemIndex].quantity = newQuantity; 
        updateCart();
    }
});

       // element to sort
const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");
const productsContainer = document.querySelector(".products");
const products = Array.from(document.querySelectorAll(".product"));

// set event to buttons
categorySelect.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", sortProducts);

// function to sort goods
function filterProducts() {
    const selectedCategory = categorySelect.value;

    products.forEach((product) => {
        const category = product.getAttribute("data-category");
        if (selectedCategory === "all" || category === selectedCategory) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

function sortProducts() {
    const selectedSort = sortSelect.value;
    
    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute("data-price"));
        const priceB = parseFloat(b.getAttribute("data-price"));

        if (selectedSort === "price-asc") {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        productsContainer.appendChild(product);
    });
}

filterProducts();
sortProducts();
