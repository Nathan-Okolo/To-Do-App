const Item = require("../models/item");
const List = require("../models/item");

const item1 = new Item({
  name: "Welcome to your Todo list",
});
// item1.save();

const item2 = new Item({
  name: "Hit the + button to add a new item",
});
// item2.save();

const item3 = new Item({
  name: "You can also switch sides too",
});
// item3.save();

const defaultItems = [item1, item2, item3];
const workItems = [];

module.exports = {
  homePage: (req, res) => {
    var today = new Date();
    let options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    let day = today.toLocaleDateString("en-US", options);

    Item.find({}, (err, items) => {
      if (items.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (err) {
            console.log(`ERROR ${err}`);
          } else {
            console.log("initial items successfully saved to items DB");
          }
        });
        res.redirect("/");
      } else {
        // console.log("Initail items already added");
        // console.log(defaultItems);
        res.render("list", { listTitle: day, newListItems: items });
      }
    });
  },

  uploadItems: (req, res) => {
    const itemName = req.body.Item;

    const item = new Item({
      name: itemName,
    });

    item.save();

    if (req.body.list === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      defaultItems.push(item);
      res.redirect("/");
    }
  },

  workPage: (req, res) => {
    Item;
    res.render("list", { listTitle: "Work Lists", newListItems: workItems });
  },

  aboutPage: (req, res) => {
    res.render("about");
  },

  deleteItem: (req, res) => {
    const checkedItemId = req.body.checkedItem;

    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (!err) {
        console.log("Item Deletd");
      }
    });
    res.redirect("/");
  },

  custom: (req, res) => {
    const customName = req.params.customListName;

    List.findOne({ name: customName }, (err, foundList) => {
      if (!err) {
        if (!foundList) {
          // create a new list
          console.log("doesnt exist");
          const list = new List({
            name: customName,
            items: defaultItems,
          });
          list.save()
        } else {
          // Show existing list
          res.render('list',{listTitle: foundList.name, newListItems: foundList.items });
          console.log("exists");
        }
      }
    });

  },
};
