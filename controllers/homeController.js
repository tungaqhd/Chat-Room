const Message = require('../models/message.model');
const moment = require('moment');
exports.index = async(req, res) => {
  try {
    const config = {
      baseUrl: process.env.URL,
      name: process.env.NAME,
      user: req.user || false
    };

    config.lastMessages = await Message.find({}).sort({'_id': -1}).limit(20);
    config.lastMessages = config.lastMessages.reverse();
    res.render("home", { config });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
