exports.index = (req, res) => {
  try {
    const config = {
      baseUrl: process.env.URL,
      name: process.env.NAME,
      user: req.user || false
    };
    res.render("home", { config });
  } catch (e) {
    res.status(500).send();
  }
};
