const express = require("express");
//init app
const app = express();
const joi = require("joi");
const port = 5000;

//middleware
app.use(express.json());

const books = [
    {
        id: 1,
        title: "Book 1",
        author: "Author 1",
        description: "Description 1",
        price: 10.99,
        coverImage: "https://via.placeholder.com/150",
    },
];

//http methods
app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/api/books", (req, res) => {
    res.status(200).json(books);
});

app.get("/api/books/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
});

app.post("/api/books", (req, res) => {

    const schema = joi.object({
        title: joi.string().trim().min(3).required(),
        author: joi.string().trim().min(2).max(100).required(),
        description: joi.string().trim().min(10).max(500).required(),
        price: joi.number().min(0).required(),
        coverImage: joi.string().uri().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        coverImage: req.body.coverImage,
    };
    books.push(book);
    res.status(201).json(book);
});

//run server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
