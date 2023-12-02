function searchProduct() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.goods_card-1, .goods_card-2, .goods_card-3');

    cards.forEach(card => {
        const titleElements = card.querySelectorAll('.title');
        let found = false;

        titleElements.forEach(titleElement => {
            const title = titleElement.innerText.toLowerCase();
            if (title.includes(searchInput)) {
                found = true;
            }
        });

        if (found) {
            card.classList.add('highlight');
            showBuyConfirmation(card);
        } else {
            card.classList.remove('highlight');
        }
    });
}

function showBuyConfirmation(card) {
    const titleElement = card.querySelector('.title');
    const productName = titleElement.innerText;

    const confirmationPopup = document.getElementById('buyConfirmationPopup');
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.innerText = `Do you want to buy "${productName}"?`;

    confirmationPopup.style.display = 'block';
}