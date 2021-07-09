// import our User Model-Schema
const { User } = require("../models/user");
// lib
const express = require("express");
const router = express.Router();

// GET
router.get(`/`, async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// export router
module.exports = router;
