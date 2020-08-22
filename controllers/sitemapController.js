const express = require("express");
const User = require("./../models/user.model");
exports.index = async (req, res) => {
  const users = await User.find({});
  let xml_content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    "    <loc>"+process.env.URL+"</loc>",
    "  </url>",
    "  <url>",
    "    <loc>"+process.env.URL+"page/about</loc>",
    "  </url>",
    "  <url>",
    "    <loc>"+process.env.URL+"page/about</loc>",
    "  </url>",
    "  <url>",
    "    <loc>"+process.env.URL+"page/privacy-policy</loc>",
    "  </url>",
    "  <url>",
    "    <loc>"+process.env.URL+"page/terms</loc>",
    "  </url>"
  ];

  users.forEach(user => {
    xml_content.push("<url>");
    xml_content.push("<loc>"+process.env.URL+"profile/"+user.username+"</loc>");
    xml_content.push("</url>");
  });
  
  xml_content.push("</urlset>");
  res.set("Content-Type", "text/xml");
  res.send(xml_content.join("\n"));
};
