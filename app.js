const express = require("express");
//init app
const app = express();
const port = 5000;
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/author");
const mongoose = require("mongoose");

//conn to db
mongoose.connect("mongodb://localhost/bookStoreDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

//middleware
app.use(express.json());

//http methods
app.get("/", (req, res) => {
    res.send("hello world");
});

//routes
app.use("/api/books",booksRouter);
app.use("/api/authors", authorsRouter);

//run server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
