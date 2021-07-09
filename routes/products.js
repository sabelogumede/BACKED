// import our Product Model-Schema
const { Product } = require("../models/product");
// lib
const express = require("express");
const router = express.Router();

// GET all product route - using the Product Moodel with find, async/await
router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

// POST route - use Model to create a new Product
router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  // save data - and send back status on success
  product
    .save()
    .then((createProduct) => {
      res.status(201).json(createProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

// export router
module.exports = router;
