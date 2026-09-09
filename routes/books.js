const express = require('express');
const router = express.Router();
const joi = require("joi");


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


/** 
* @desc Get all books
* @route GET /api/books
* @method GET
* @access Public
**/
router.get("/", (req, res) => {
    res.status(200).json(books);
});


/** 
* @desc Get a book by ID
* @route GET /api/books/:id
* @method GET
* @access Public
**/
router.get("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
});

/** 
* @desc Create a new book
* @route POST /api/books
* @method POST
* @access Public
**/
router.post("/", (req, res) => {

    

    const { error } = validateBook(req.body);
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

//validation function
function validateBook(book) {
    const schema = joi.object({
        title: joi.string().trim().min(3).required(),
        author: joi.string().trim().min(2).max(100).required(),
        description: joi.string().trim().min(10).max(500).required(),
        price: joi.number().min(0).required(),
        coverImage: joi.string().uri().required(),
    });

    return schema.validate(book);
} 

module.exports = router;