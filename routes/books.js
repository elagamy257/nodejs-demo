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
    const { error } = validateCreateBook(req.body);
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


/** 
* @desc Update a book by ID
* @route PUT /api/books/:id
* @method PUT
* @access Public
**/
router.put("/:id", (req, res) => {
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.description = req.body.description;
    book.price = req.body.price;
    book.coverImage = req.body.coverImage;

    res.status(200).json(book);
});

/** 
* @desc Delete a book by ID
* @route DELETE /api/books/:id
* @method DELETE
* @access Public
**/
router.delete("/:id", (req, res) => {
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
    books.splice(bookIndex, 1);
    res.status(200).json({ message: 'Book deleted' });
});

//validation function
function validateCreateBook(book) {
    const schema = joi.object({
        title: joi.string().trim().min(3).required(),
        author: joi.string().trim().min(2).max(100).required(),
        description: joi.string().trim().min(10).max(500).required(),
        price: joi.number().min(0).required(),
        coverImage: joi.string().uri().required(),
    });

    return schema.validate(book);
} 
function validateUpdateBook(book) {
    const schema = joi.object({
        title: joi.string().trim().min(3).optional(),
        author: joi.string().trim().min(2).max(100).optional(),
        description: joi.string().trim().min(10).max(500).optional(),
        price: joi.number().min(0).optional(),
        coverImage: joi.string().uri().optional(),
    });

    return schema.validate(book);
}

module.exports = router;