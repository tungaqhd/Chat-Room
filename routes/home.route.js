const express = require('express');
const route = express.Router();

const homeController = require('../controllers/homeController');

route.get('/', homeController.index);
route.get('/contact', homeController.contact);
route.get('/about', homeController.about);
route.get('/terms', homeController.terms);
route.get('/privacy-policy', homeController.privacy);

module.exports = route;