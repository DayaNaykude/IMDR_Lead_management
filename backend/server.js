const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");
// const errorHandler = require("./middleware/error");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const leadRoutes = require("./routes/leadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", leadRoutes);

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
