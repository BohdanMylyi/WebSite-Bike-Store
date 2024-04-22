function confirmBuy() {
    const confirmationPopup = document.getElementById('buyConfirmationPopup');
    confirmationPopup.style.display = 'none';

    const card = document.querySelector('.highlight');
    const titleElement = card.querySelector('.title');
    const productName = titleElement.innerText;
    const priceElement = card.querySelector('.priceRoadBike');
    const price = parseFloat(priceElement.innerText.replace('$', ''));

    addToCart(productName, price);
    addToCartServer(productName, price);
    showNotification(`Product "${productName}" added in basket!`);

}

function cancelBuy() {
    closeBuyConfirmation();
}

function closeBuyConfirmation() {
    const confirmationPopup = document.getElementById('buyConfirmationPopup');
    confirmationPopup.style.display = 'none';
}


function showNotification(message) {
    const notificationElement = document.getElementById('notification');
    notificationElement.innerText = message;

    notificationElement.style.display = 'block';

    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, 3000);
}