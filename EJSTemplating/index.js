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
// Add JSON body parser for API requests
app.use(express.json());

let listItems = [];

app.get("/", (req, res) => {
  res.render("index", { todoList: listItems });
});

app.post("/", (req, res) => {
  console.log("req", req.body.task);
  if (req.body.task.trim() === "") {
    res.render("index", { todoList: listItems, error: "Please enter a task" });
  } else {
    listItems.push(req.body.task);
    res.redirect("/");
  }
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  console.log(index);
  if (index !== undefined && index >= 0 && index < listItems.length) {
    listItems.splice(index, 1);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid index" });
  }
});

app.put("/:index", (req, res) => {
  const index = req.params.index;
  console.log("req", req.body);
  listItems[index] = req.body.value;
  console.log("listItems", listItems);
});

app.listen(port, () => {
  console.log("Wohoo!!! Server started");
});
