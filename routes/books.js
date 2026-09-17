const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verfiyToken");
const {
  getAllBooks,
  getBookById,
  createNewBook,
  updateBook,
  deleteBookById,
} = require("../controllers/bookController");

// /api/books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createNewBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBookById);

module.exports = router;
