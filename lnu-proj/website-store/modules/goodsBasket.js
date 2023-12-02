let cartItemCount = 0;

function addToCart(productName, price) {
    cartItemCount++;
    updateCartCount();
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <span>${productName}</span>
        <span>$${price}</span>
    `;

    cartItems.appendChild(cartItem);

    const currentTotal = parseFloat(cartTotal.innerText);
    cartTotal.innerText = (currentTotal + price).toFixed(2);
    showNotification(`Product "${productName}" added in basket!`);
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartItemCount.toString();
    }
}

function toggleCart() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.classList.toggle('show');
}

function clearCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    cartTotal.innerText = '0.00';
    
    cartItemCount = 0;
    updateCartCount()
}

function addToCartServer(productName, price) {
    fetch('/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, price }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function clearCartServer() {
    fetch('/clearCart', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
