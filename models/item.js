const mongoose = require("mongoose");

const itemsSchema = {
  name: String,
  unique: false
};

const Item = mongoose.model("item", itemsSchema);

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("list", listSchema)

module.exports = Item

