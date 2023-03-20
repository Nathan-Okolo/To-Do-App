const express = require("express");
const bodyParser = require("body-parser");
require('./config/db')
//get our routes folder
const appRouter = require('./routes/routes')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public')); 

app.set("view engine", "ejs");
//make use of our routes
app.use(appRouter)

const port = 3000;

app.listen(port, () => {
  console.log("Server running on port " + port);
});  