const mongoose = require("mongoose")

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  nationality: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
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

module.exports = Author;
