const express = require('express');
const router = express.Router();
const {Author, validateCreateAuthor, validateUpdateAuthor} = require("../models/Author");

// get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find()
    // const authors = await Author.find().sort({ firstName: 1 }).select("firstName lastName -_id");
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get author by id
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a new author
router.post("/", async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newAuthor = new Author(req.body);
    const result = await newAuthor.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a author by ID
router.put("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
    if (!author) return res.status(404).json({ message: 'Author not found' });
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    res.status(200).json(author);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
})

//delete a author by ID
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})


module.exports = router;