const express = require("express");
//init app
const app = express();
const port = process.env.PORT || 5000;
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/author");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const {errorHandel , notFound} =require("./middlewares/errors")
const dotenv = require("dotenv");
dotenv.config();

//conn to db
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

//middleware
app.use(express.json());

app.use(logger);

//http methods
app.get("/", (req, res) => {
    res.send("hello world");
});

//routes
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);

//error handling middleware
app.use(notFound);
app.use(errorHandel);

//run server
app.listen(port, () => {
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});
