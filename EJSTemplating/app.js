const express = require("express");
const bodyParser = require("body-parser");

var app = express();
const port = "8000";
// we use view engine to render the ejs files
app.set("view engine", "ejs");
// We use urlencoded to parse the body of the request
app.use(express.urlencoded({ extended: true }));
// to serve static files like css, images, etc. we need to use this middleware
app.use(express.static("public"));

let listItems = [];

app.get("/", (req, res) => {
  res.render("list", { exej: listItems });
});

app.post("/", (req, res) => {
  listItems.push(req.body.task);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Wohoo!!! Server started");
});
