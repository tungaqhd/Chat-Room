const express = require('express');
const route = express.Router();

const profileController = require('../controllers/profileController');

route.get('/', ensureAuthenticated, profileController.index);
route.get('/:username', profileController.view);
route.post('/update/:userId', ensureAuthenticated, profileController.update);
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
  }
module.exports = route;