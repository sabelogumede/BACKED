// import our Categories Model-Schema
const { Category } = require("../models/category");
// lib
const express = require("express");
const router = express.Router();
// GET
router.get(`/`, async (req, res) => {
  const categorieList = await Category.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(categorieList);
});
// export router
module.exports = router;
