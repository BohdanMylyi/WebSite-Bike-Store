const express = require('express');
const router = express.Router();


  const homeMiddleware = (req, res, next) => {
    next(); 
  };
  
  const showHomePage = (req, res) => {
    res.render('index.ejs');
  };
  
  const handleHome = (req, res) => {
  };
  
  module.exports = {
    homeMiddleware,
    showHomePage,
    handleHome
  };