const mongoose = require("mongoose");
const joi = require("joi");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    coverImage: {
      type: String,
      required: true,
      enum: ["softcover", "hardcover", "ebook"],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

//validation function
function validateCreateBook(book) {
  const schema = joi.object({
    title: joi.string().trim().min(3).required(),
    author: joi.string().required(),
    description: joi.string().trim().min(5).required(),
    price: joi.number().min(0).required(),
    coverImage: joi.string().valid("softcover", "hardcover", "ebook").required(),
  });

  return schema.validate(book);
}
function validateUpdateBook(book) {
  const schema = joi.object({
    title: joi.string().trim().min(3).optional(),
    author: joi.string().optional(),
    description: joi.string().trim().min(5).optional(),
    price: joi.number().min(0).optional(),
    coverImage: joi.string().valid("softcover", "hardcover", "ebook").optional(),
  });

  return schema.validate(book);
}

module.exports = {
  Book,
  validateCreateBook,
  validateUpdateBook
};