const Message = require("../models/message.model");
const moment = require("moment");
const User = require("../models/user.model");
exports.index = async (req, res) => {
  try {
    const config = {
      baseUrl: process.env.URL,
      name: process.env.NAME,
      user: req.user || false,
    };

    config.lastMessages = await Message.find({}).sort({ _id: -1 }).limit(20);
    config.lastMessages = config.lastMessages.reverse();
    res.render("home", { config });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
exports.about = async (req, res) => {
  try {
    const config = {
      baseUrl: process.env.URL,
      name: process.env.NAME,
      user: req.user || false,
    };
    res.render("about", { config });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
exports.privacy = async (req, res) => {
  try {
    const config = {
      baseUrl: process.env.URL,
      name: process.env.NAME,
      user: req.user || false,
    };
    res.render("privacy", { config });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
exports.contact = async (req, res) => {
  try {
    const config = {
      baseUrl: process.env.URL,
      name: process.env.NAME,
      user: req.user || false,
    };
    res.render("contact", { config });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
exports.terms = async (req, res) => {
  try {
    const config = {
      baseUrl: process.env.URL,
      name: process.env.NAME,
      user: req.user || false,
    };
    res.render("terms", { config });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
