const express = require('express');
const router = express.Router();
const joi = require("joi");
const Author = require("../models/Author");

const authors = [
  {
    id: 1,
    firstName: "Author 1",
    lastName: "Last Name 1",
    nationality: "Nationality 1",
    birthDate: "1990-01-01",
    image: "https://via.placeholder.com/150",

  }
]

// get all authors
router.get("/", (req, res) => {
  res.status(200).json(authors);

});

// get author by id
router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: 'Author not found' });
  res.status(200).json(author);
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
router.put("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: 'Author not found' });
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  author.firstName = req.body.firstName
  author.lastName = req.body.lastName
  author.nationality = req.body.nationality
  author.birthDate = req.body.birthDate
  author.image = req.body.image

  res.status(200).json(author);
})

//delete a author by ID
router.delete("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ message: 'Author not found' });
  const index = authors.indexOf(author);
  authors.splice(index, 1);
  res.status(200).json({ message: 'Author deleted successfully' });
})

// validate author
function validateCreateAuthor(author) {
  const schema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    nationality: joi.string().min(3).required(),
    birthDate: joi.date().required(),
    image: joi.string().uri().required()
  });
  return schema.validate(author);
}

function validateUpdateAuthor(author) {
  const schema = joi.object({
    firstName: joi.string().min(3),
    lastName: joi.string().min(3),
    nationality: joi.string().min(3),
    birthDate: joi.date(),
    image: joi.string().uri()
  });
  return schema.validate(author);
}

module.exports = router;