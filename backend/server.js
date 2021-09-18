// require("dotenv").config({ path: "./config.env" });
const dotenv = require("dotenv");
dotenv.config();

// const errorHandler = require("./middleware/error");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/auth", userRoutes);
// app.use("/api/private", require("./routes/private"));

//error handler
// app.use(errorHandler);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error : ${err}`);
  server.close(() => process.exit(1));
});
