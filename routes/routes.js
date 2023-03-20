const express = require("express");

const router = express.Router();
const controllers = require("../controller/controller");

// let items = ["Buy Food", "Cook Food", "Eat Food"];
// let workItems = []

router.get("/", controllers.homePage);

router.post("/", controllers.uploadItems);

router.get("/work", controllers.workPage);
router.get("/:customListName", controllers.custom);

router.get("/about", controllers.aboutPage);
router.post("/delete", controllers.deleteItem);

module.exports = router;
