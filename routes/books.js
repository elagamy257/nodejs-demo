const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Book, validateCreateBook, validateUpdateBook } = require("../models/Book");
const {verifyTokenAndAdmin} = require("../middlewares/verfiyToken");


/** 
* @desc Get all books
* @route GET /api/books
* @method GET
* @access Public
**/
router.get("/", asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author",["_id","firstName","lastName"]);
    res.status(200).json(books);
}));


/** 
* @desc Get a book by ID
* @route GET /api/books/:id
* @method GET
* @access Public
**/
router.get("/:id", asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author",["_id","firstName","lastName"]);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
}));

/** 
* @desc Create a new book
* @route POST /api/books
* @method POST
* @access Public
**/
router.post("/",verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        coverImage: req.body.coverImage,
    });
    const result = await book.save();
    res.status(201).json(result);
}));


/** 
* @desc Update a book by ID
* @route PUT /api/books/:id
* @method PUT
* @access Public
**/
router.put("/:id", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
}));

/** 
* @desc Delete a book by ID
* @route DELETE /api/books/:id
* @method DELETE
* @access Public
**/

router.delete("/:id", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted' });
}));




module.exports = router;