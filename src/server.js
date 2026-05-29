require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");


const swaggerSpec = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middleware/error.middleware");

const app = express();

connectDB();

app.use(express.json());
app.use(errorHandler);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/notifications", notificationRoutes);

app.get('/helth', (req, res) => {
  res.send('helth check');
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});