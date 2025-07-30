const express = require("express");
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const cartRouter = require("./routes/cart.router"); 

const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);

module.exports = app;
