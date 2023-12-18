const express = require("express");
const app = express()
const bodyParser = require('body-parser');
const notifier = require('node-notifier');
const registrationMiddleware = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/middlewares/registrationMiddleware');
const loginMiddleware = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/middlewares/loginMiddleware');

const loginRoutes = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/routes/loginRoutes.js');
const registerRoutes = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/routes/registerRoutes.js');
const loginController = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/controllers/loginController');
const registerController = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/controllers/registerController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.set('view engine', 'ejs');


app.use('/logo-and-icons', express.static('./logo-and-icons'));
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

app.post('/login', loginMiddleware.loginUser, (req, res) => {
  res.redirect('/home');
});

app.post('/register', registrationMiddleware.registerUser, (req, res) => {
  res.redirect('/login');
});

app.get('/home', (req, res) => {
    res.render("index.ejs")
})

app.get('/contact', (req, res) => {
  res.render("contact.ejs")
})

app.get('/login', loginController.showLoginPage);

app.get('/register', registerController.showRegisterPage);

app.get('/redirectToLogin', (req, res) => {
    res.redirect('/login');
  });

app.get('/redirectToRegister', (req, res) => {
    res.redirect('/register');
})

app.get('/redirectToContacts', (req, res) => {
  res.redirect('/contact');
})

app.listen(3000)

app.post('/addToCart', (req, res) => {
  const { productName, price } = req.body;

  fetch('http://localhost:3001/addToCart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, price }),
  })
  .then(response => response.json())
  .then(data => res.json(data))
  .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
});

app.post('/clearCart', (req, res) => {
  fetch('http://localhost:3001/clearCart', {
      method: 'POST',
  })
  .then(response => response.json())
  .then(data => res.json(data))
  .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
});