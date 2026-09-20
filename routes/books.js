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

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of books
 *   post:
 *     summary: Create a new book (Admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - description
 *               - price
 *               - coverImage
 *             properties:
 *               title:
 *                 type: string
 *                 example: Node.js Design Patterns
 *               author:
 *                 type: string
 *                 description: Author ID (MongoDB ObjectId)
 *                 example: 60d21b4667d0d8992e610c85
 *               description:
 *                 type: string
 *                 example: A comprehensive guide to building Node.js applications
 *               price:
 *                 type: number
 *                 example: 29.99
 *               coverImage:
 *                 type: string
 *                 enum: [softcover, hardcover, ebook]
 *                 example: softcover
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: No token provided or invalid token
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *   put:
 *     summary: Update book by ID (Admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Node.js Design Patterns 3rd Edition
 *               author:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               description:
 *                 type: string
 *                 example: Updated edition covering Node.js best practices
 *               price:
 *                 type: number
 *                 example: 34.99
 *               coverImage:
 *                 type: string
 *                 enum: [softcover, hardcover, ebook]
 *                 example: hardcover
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Book not found
 *   delete:
 *     summary: Delete book by ID (Admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Book not found
 */

// /api/books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createNewBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBookById);

module.exports = router;
