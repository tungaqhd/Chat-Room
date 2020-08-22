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
