const express = require("express");
const app = express();
const morgan = require("morgan");

// Middleware -lib
app.use(express.json());
app.use(morgan("tiny"));

require("dotenv/config");

const api = process.env.API_URL;

// get route
app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "some_url",
  };
  res.send(product);
});
// post route
app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

// application listening port
app.listen(3000, () => {
  console.log("server running http://localhost:3000");
});
