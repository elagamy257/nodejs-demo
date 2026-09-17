const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

/**
 * @desc Get all authors
 * @route GET /api/authors
 * @method GET
 * @access Public
 **/
const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const authorsPerPage = 2;
  let authors;
  if (pageNumber) {
    const page = parseInt(pageNumber) || 1;
    authors = await Author.find()
      .skip((page - 1) * authorsPerPage)
      .limit(authorsPerPage);
  } else {
    authors = await Author.find();
  }
  res.status(200).json(authors);
});

/**
 * @desc Get author by ID
 * @route GET /api/authors/:id
 * @method GET
 * @access Public
 **/
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.status(200).json(author);
});

/**
 * @desc Create new author
 * @route POST /api/authors
 * @method POST
 * @access Private (Only Admin)
 **/
const createAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const newAuthor = new Author(req.body);
  const result = await newAuthor.save();
  res.status(201).json(result);
});

/**
 * @desc Update an author by ID
 * @route PUT /api/authors/:id
 * @method PUT
 * @access Private (Only Admin)
 **/
const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!author) return res.status(404).json({ message: "Author not found" });
  res.status(200).json(author);
});

/**
 * @desc Delete an author by ID
 * @route DELETE /api/authors/:id
 * @method DELETE
 * @access Private (Only Admin)
 **/
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ message: "Author not found" });
  await Author.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Author deleted successfully" });
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
