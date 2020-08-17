const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/authController');
const route = require('./index.route');
router.get('/login', passport.authenticate('facebook',{scope:'email'}));
router.get('/callback', passport.authenticate('facebook', { successRedirect : '/profile', failureRedirect: '/' }), authController.callback);
router.get('/logout', authController.logout);

module.exports = router;