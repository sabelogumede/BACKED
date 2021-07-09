const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
// env config
require("dotenv/config");
const api = process.env.API_URL;
// Middleware -lib
app.use(express.json());
app.use(morgan("tiny"));

// Product Schema
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});
// Product Model
const Product = mongoose.model("Product", productSchema);

// GET route - using the Product Moodel with find, async/await
app.get(`${api}/products`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});
// POST route - use Model to create a new Product
app.post(`${api}/products`, (req, res) => {
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

// connect to mongoose cloud
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mean-eshop",
  })
  .then(() => {
    console.log("Database Connection is ready....");
  })
  .catch((err) => {
    console.log(err);
  });

// application listening port
app.listen(3000, () => {
  console.log("server running http://localhost:3000");
});
