const passport = require('passport');
exports.callback = async(req, res) => {
    res.send('1');
}
exports.logout = async(req, res) => {
    req.logout();
    res.redirect('/');
}