const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

// env config
require("dotenv/config");

//Routes -apis
const productsRouters = require("./routes/products");
// const categoriesRouters = require("./routes/categories");
const usersRouters = require("./routes/users");
// const ordersRouters = require("./routes/orders");

// Middleware -lib
app.use(express.json());
app.use(morgan("tiny"));

// api key
const api = process.env.API_URL;

// Routers - GET/POST routes middleware
app.use(`${api}/products`, productsRouters);
// app.use(`${api}/categories`, categoriesRouters);
app.use(`${api}/users`, usersRouters);
// app.use(`${api}/orders`, ordersRouters);

//Database - connect to mongoose cloud
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

//Server - application listening port
app.listen(3000, () => {
  console.log("server running http://localhost:3000");
});
