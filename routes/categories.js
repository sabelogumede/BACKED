// import our Categories Model-Schema
const { Category } = require("../models/category");
// lib
const express = require("express");
const router = express.Router();

// GET
router.get(`/`, async (req, res) => {
  const categorieList = await Category.find();

  if (!categorieList) {
    res.status(500).json({ success: false });
  }
  res.send(categorieList);
});
// Post
router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(404).send("the category cannot be created!");

  res.send(category);
});
// Delete
router.delete(`/:categoryid`, (req, res) => {
  Category.findByIdAndRemove(req.params.categoryid)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          success: true,
          message: "category have been deleted!",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "category not found!",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

// export router
module.exports = router;
