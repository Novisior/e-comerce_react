const express = require("express");
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/user.router");
const cartRouter = require("./routes/cart.router");

const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://e-comerce-react-sepia.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);

// Home route (to avoid 404 on root)
app.get("/", (req, res) => {
  res.send("🛍️ E-commerce API is running");
});

module.exports = app;
