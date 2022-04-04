const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); 
// app.use(express.static("public")); 

app.set("view engine", "ejs");
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = []

app.get("/", (req, res) => {
  var today = new Date(); 
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, newListItems : items });
}); 

app.post("/", (req, res) => {
  let item = req.body.Item;
  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/");
  }
});

app.get('/work', (req, res) => {
  res.render("list", {listTitle: "Work Lists",newListItems: workItems})
});

app.get('/about', (req, res) => {
  res.render('about')
});

const port = 3000;

app.listen(port, () => {
  console.log("Server running on port " + port);
}); 