const allGoodsContainer = document.getElementById('allGoods');
let currentCategory = 'all';
const catalogContent = document.getElementById('catalogContent'); 

function filterGoods(category) {
    currentCategory = category;
    updateGoods();
}

function updateGoods() {
    const filteredGoods = getFilteredGoods(currentCategory);
    renderGoods(filteredGoods);
}

async function getFilteredGoods(type) {
    try {
        const response = await fetch(`/getProducts?type=${type}`);
        const goodsData = await response.json();
        return goodsData;
    } catch (error) {
        console.error('Error fetching goods data:', error);
        return [];
    }
}

function renderGoods(goodsData) {
  const goodsListContainer = document.getElementById('goodsList');
  goodsListContainer.innerHTML = '';

  goodsData.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
          <div class="goods-card">
              <img src="${item.image}" alt="${item.name}" class="roadBikePhoto">
              <h2 class="title">${item.name}</h2>
              <h3 class="priceRoadBike">${item.price}$</h3>
              <button class="buyRoadBike" onclick="addToCart('${item.name}', ${item.price})">Buy</button>
          </div>
      `;

      goodsListContainer.appendChild(itemElement);
  });
}

function toggleCatalog() {
    catalogContent.classList.toggle('show');
}
