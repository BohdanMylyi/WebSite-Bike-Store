const express = require('express');
const registerController = require('/Users/Bohdan/projects/lnu-proj/website-store/modules/controllers/registerController');
const router = express.Router();

router.get('/register', registerController.showRegisterPage);

module.exports = router;
