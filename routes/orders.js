// import our Order Model-Schema
const { Order } = require("../models/order");
// lib
const express = require("express");
const router = express.Router();

// GET
router.get(`/`, async (req, res) => {
  const orderList = await Order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

// export router
module.exports = router;
