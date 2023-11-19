const express = require('express');
const loginController = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/controllers/loginController');
const router = express.Router();

router.get('/login', loginController.showLoginPage);

module.exports = router;
