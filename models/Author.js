const mongoose = require("mongoose")
const joi = require("joi");

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  birthDate: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150"

  },
},
  { timestamps: true });

const Author = mongoose.model("Author", AuthorSchema);


// validate author
function validateCreateAuthor(author) {
  const schema = joi.object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    nationality: joi.string().min(3).required(),
    birthDate: joi.date().required(),
    image: joi.string().uri()
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


module.exports = {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor
};
