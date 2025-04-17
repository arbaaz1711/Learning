const express = require("express");
const bodyParser = require("body-parser");

var app = express();
const port = "8000";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
let example = "Testing";
let listItems = [];
app.get("/", (req, res) => {
  res.render("list", { exej: listItems });
});

app.post("/", (req, res) => {
  listItems.push(req.body.task);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("ohoo!!! Server started");
});
