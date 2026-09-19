const express = require("express");
const logger = require("./middlewares/logger");
const { errorHandel, errorHandler, notFound } = require("./middlewares/errors");
require("dotenv").config();
const connectToDB = require("./config/db");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

// init app
const app = express();
const port = process.env.PORT || 5000;

// connect to database
connectToDB();

// security middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());

// middleware parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// static folder
app.use(express.static(path.join(__dirname, "images")));

// set view engine
app.set("view engine", "ejs");

// root endpoint
app.get("/", (req, res) => {
  res.send("hello world");
});

// routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/author"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));

// error handling middleware
app.use(notFound);
app.use(errorHandler || errorHandel);

// run server
const server = app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV || "development"} mode on port ${port}`,
  );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
