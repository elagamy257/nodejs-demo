const express = require("express");
const router = express.Router();
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { verifyTokenAndAdmin } = require("../middlewares/verfiyToken");

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of authors
 *   post:
 *     summary: Create a new author (Admin only)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - nationality
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Robert
 *               lastName:
 *                 type: string
 *                 example: Martin
 *               nationality:
 *                 type: string
 *                 example: American
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1952-12-05
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: https://via.placeholder.com/150
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *
 * /api/authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 *   put:
 *     summary: Update author by ID (Admin only)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Robert C.
 *               lastName:
 *                 type: string
 *                 example: Martin
 *               nationality:
 *                 type: string
 *                 example: American
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 example: 1952-12-05
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: https://via.placeholder.com/150
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Author not found
 *   delete:
 *     summary: Delete author by ID (Admin only)
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Author not found
 */

// /api/authors
router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createAuthor);

// /api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
