const dns = require("dns");
const res = require("express/lib/response");
const fs = require("fs");

require("express");

let database = [];

let regex = /^(http|https):\/\/[a-zA-z0-9-]*\.[a-z]{1,}/g;

let urlgenerator = (url, req, res) => {
  let dataFile = [];
  let jsonFile = {};
  fs.readFile("./database.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err + "błąd");
      return null;
    } else {
      dataFile = data.split(",");
      jsonFile = { original_url: url, short_url: dataFile.length - 1 };
      res.send(jsonFile);
      database = dataFile;
      return;
    }
  });
};

let generateUrl = (req, res) => {
  let url = req.body.url;
  if (regex.test(url)) {
    fs.writeFile(`./database.txt`, `,${url}`, { flag: "a+" }, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Saved!");
        urlgenerator(url, req, res);
      }
    });
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
    console.log(`couldn't reach ${database[id]}`)
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
