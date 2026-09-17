const {Book} = require("./models/Book")
const {Author} = require("./models/Author")
const {books, authors} = require("./data")
const connectToDB = require("./config/db")
require("dotenv").config()

//conn to db
connectToDB();

//import Books
const importBooks = async () =>{
  try {
    await Book.insertMany(books)
    console.log("Books imported")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

//import Authors
const importAuthors = async () =>{
  try {
    await Author.insertMany(authors)
    console.log("Authors imported")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

//remove Books
const removeBooks = async () =>{
  try {
    await Book.deleteMany();
    console.log("Books removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//remove Authors
const removeAuthors = async () =>{
  try {
    await Author.deleteMany();
    console.log("Authors removed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

if(process.argv[2] === "-import"){
  importBooks();
} else if (process.argv[2] === "-remove"){
  removeBooks();
} else if (process.argv[2] === "-import-authors"){
  importAuthors();
}