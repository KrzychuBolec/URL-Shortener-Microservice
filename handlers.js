const dns = require("dns");
const res = require("express/lib/response");
const fs = require("fs");

require("express");

let database = [];

let regex = /^(http|https):\/\/[a-zA-z0-9-]*\.[a-z]{1,}/;

let generateUrl = (req, res) => {
  let url = req.body.url;
  if (regex.test(url)) {
      console.log(`Url requested: ${url}`)
    database.push(url);
    res.send ({ original_url: url, short_url: database.length - 1 });
  } else {
    res.send({ error: "invalid url" });
  }
};

let redirect = (req, res) => {
  let id = req.params.url;
  if (database[id] != undefined) {
    console.log(database[id]);
    res.redirect(database[id]);
  } else {
    console.log(
      `couldn't reach ${database[id]}, id proposed = ${id}, parameters = ${req.params}`
    );
    console.log(`parameters = ${req.params}`);
    res.send({ error: "invalid url" });
  }
};

let getHomepage = (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
};

module.exports = {
  getHomepage,
  generateUrl,
  redirect,
};
