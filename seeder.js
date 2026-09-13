const {Book} = require("./models/Book")
const {books} = require("./data")
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

if(process.argv[2] === "-import"){
  importBooks();
} else if (process.argv[2] === "-remove"){
  removeBooks();
}