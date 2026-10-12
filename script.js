const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 4500,
        image: "https://placehold.co/400x250?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 6500,
        image: "https://placehold.co/400x250?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 3200,
        image: "https://placehold.co/400x250?text=Speaker"
    }
];


const productList = document.getElementById("product-list");

function displayProducts() {
    productList.innerHTML = "";

    products.forEach(function (product) {
        const productCard = document.createElement("div");

        productCard.className =
            "overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg";

        productCard.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
                class="h-48 w-full object-cover"
            >

            <div class="p-5">
                <h3 class="mb-2 text-lg font-semibold text-gray-800">
                    ${product.name}
                </h3>

                <p class="mb-4 text-lg font-bold text-indigo-600">
                    Rs. ${product.price.toLocaleString("en-LK")}
                </p>

                <button
                    class="w-full rounded-lg bg-indigo-600 px-4 py-2
                    font-medium text-white transition hover:bg-indigo-700"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

let cart = [];

displayProducts();


function addToCart(productId) {
    const product = products.find(function (item) {
        return item.id === productId;
    });

    const cartItem = cart.find(function (item) {
        return item.id === productId;
    });

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    cartCount.textContent = cart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);
}


function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="text-gray-500">Your cart is empty.</p>';
        cartTotal.textContent = "0.00";
        return;
    }

    cart.forEach(function (item) {
        const cartRow = document.createElement("div");

        cartRow.className =
            "flex flex-col gap-2 border-b border-gray-200 py-4 sm:flex-row sm:items-center sm:justify-between";

        cartRow.innerHTML = `
            <div>
                <h3 class="font-semibold text-gray-800">
                    ${item.name}
                </h3>

                <p class="text-sm text-gray-500">
                    Rs. ${item.price.toLocaleString("en-LK")} × ${item.quantity}
                </p>
            </div>

            <p class="font-bold text-indigo-600">
                Rs. ${(item.price * item.quantity).toLocaleString("en-LK", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </p>
        `;

        cartItems.appendChild(cartRow);
    });

    const total = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotal.textContent = total.toLocaleString("en-LK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

