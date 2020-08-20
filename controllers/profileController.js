const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const xss = require("xss");
const User = require("../models/user.model");
const { profile } = require("console");

exports.index = async (req, res) => {
  const user = await User.findById(req.user._id);
  const config = {
    baseUrl: process.env.URL,
    name: process.env.NAME,
    user: user || false,
  };

  if (req.query.msg) {
    config.message = req.query.msg;
  }
  res.render("profile", { config });
};

exports.update = async (req, res) => {
  try {
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      const userId = req.params.userId;
      const username = fields.username;
      const name = fields.name;
      const contact = fields.contact;
      const website = fields.website;
      const facebook = fields.website;
      const twitter = fields.website;
      const instagram = fields.website;
      const description = fields.description;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send();
      }

      if (username) {
        if (
          username.length < 5 ||
          username.length > 10 ||
          /[^a-z0-9_]/i.test(username)
        ) {
          return res.redirect("/profile?msg=invalid username");
        }
      }

      if (name) {
        if (name.length < 5 || name.length > 100) {
          return res.redirect("/profile?msg=invalid name");
        }
      }

      if (contact) {
        if (contact.length < 5 || contact.length > 100) {
          return res.redirect("/profile?msg=invalid contact");
        }
      }
      if (website) {
        if (website.length < 5 || website.length > 100) {
          return res.redirect("/profile?msg=invalid website");
        }
      }
      if (facebook) {
        if (facebook.length < 5 || facebook.length > 100) {
          return res.redirect("/profile?msg=invalid facebook");
        }
      }
      if (twitter) {
        if (twitter.length < 5 || twitter.length > 100) {
          return res.redirect("/profile?msg=invalid twitter");
        }
      }
      if (instagram) {
        if (instagram.length < 5 || instagram.length > 100) {
          return res.redirect("/profile?msg=invalid instagram");
        }
      }

      if (description) {
        if (description.length < 1 || description.length > 5000) {
          return res.redirect("/profile?msg=invalid description");
        }
      }

      if (files["avatar"] && files["avatar"].size > 0) {
        const fileName = files.avatar.name;
        if (
          !fileName.endsWith(".png") &&
          !fileName.endsWith(".jpg") &&
          !fileName.endsWith(".jpeg")
        ) {
          throw new Error("Only png, jpg and jpeg are allowed!");
        }

        const ext = fileName.split(".")[1];
        const oldPath = files.avatar.path;
        const newPath = path.join(
          __dirname,
          `../public/assets/img/avatar/${user["_id"]}.${ext}`
        );
        fs.renameSync(oldPath, newPath);

        user.avatar = `${user["_id"]}.${ext}`;
      }

      user.username = xss(username);
      user.name = xss(name);
      user.contact = xss(contact);
      user.website = xss(website);
      user.facebook = xss(facebook);
      user.twitter = xss(twitter);
      user.instagram = xss(instagram);
      user.description = xss(description);
      await user.save();
      res.redirect("/profile");
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

exports.view = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username: username });

  if (!user) {
    res.status(404).send("<h1>User not found!</h1>");
  }
  const config = {
    baseUrl: process.env.URL,
    name: process.env.NAME,
    user: user,
  };
  res.render("viewProfile", { config });
};
