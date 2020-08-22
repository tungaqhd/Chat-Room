const express = require('express');
const route = express.Router();

const homeRoute = require('./home.route');
route.use('/', homeRoute);

const authRoute = require('./auth.route');
route.use('/auth', authRoute);

const profileRoute = require('./profile.route');
route.use('/profile', profileRoute);

const sitemapController = require('../controllers/sitemapController');
route.get('/sitemap.xml', sitemapController.index);
module.exports = route;