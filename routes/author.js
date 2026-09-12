const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("../models/Author");

// get all authors
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authors = await Author.find()
    // const authors = await Author.find().sort({ firstName: 1 }).select("firstName lastName -_id");
    res.status(200).json(authors);
}
));

// get author by id
router.get("/:id", asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
}));

// create a new author
router.post("/", asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
    const newAuthor = new Author(req.body);
    const result = await newAuthor.save();
    res.status(201).json(result);
}));

// Update a author by ID
router.put("/:id", asyncHandler(async (req, res) => { 
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
}));

//delete a author by ID
router.delete("/:id", asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ message: 'Author not found' });
  await Author.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Author deleted successfully' });
}));



module.exports = router;