const express = require("express");
const bodyParser = require('body-parser');
const goodsBasket = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/goodsBasket');

const app = express();
app.use(express.static(__dirname));

app.post('/addToCart', (req, res) => {
    const { productName, price } = req.body;
    goodsBasket.addToCart(productName, price);
    res.json({ message: 'Item added to cart' });
  });
  
  app.post('/clearCart', (req, res) => {
    goodsBasket.clearCart();
    res.json({ message: 'Cart cleared' });
  });

app.listen(3001)