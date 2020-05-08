var express = require("express");
var request = require("request");
var ejs = require("ejs");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  var movie = req.query.search;
  var url = "http://www.omdbapi.com/?s=" + movie + "&apikey=thewdb";
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var results = JSON.parse(body);
      res.render("results", { results: results });
    }
  });
});

app.get('*', (req, res) => {
  res.render("404");
})
app.listen(3000, function() {
  console.log("App has been started on port 3000!");
});