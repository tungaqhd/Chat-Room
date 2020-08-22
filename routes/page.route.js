const express = require('express');
const route = express.Router();

const pageController = require('../controllers/pageController');

route.get('/contact', pageController.contact);
route.get('/about', pageController.about);
route.get('/terms', pageController.terms);
route.get('/privacy-policy', pageController.privacy);

module.exports = route;