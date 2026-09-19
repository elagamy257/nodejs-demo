const express = require("express");
const logger = require("./middlewares/logger");
const { errorHandel, notFound } = require("./middlewares/errors");
require("dotenv").config();
const connectToDB = require("./config/db");
const path = require("path")

//init app
const app = express();
const port = process.env.PORT || 5000;

// static folder
app.use(express.static(path.join(__dirname, "images")));

//conn to db
connectToDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

//http methods
app.get("/", (req, res) => {
  res.send("hello world");
});

app.set("view engine", "ejs");

//routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/author"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));

//error handling middleware
app.use(notFound);
app.use(errorHandel);

//run server
app.listen(port, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode on port ${port}`,
  );
});
