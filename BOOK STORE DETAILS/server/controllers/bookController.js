const BookModel = require("../models/book");

const getBooks = async (req, res) => {
  try {
    const book = await BookModel.find();
    if (!book) return res.status(404).send("Product not found");
    res.send(book);
  } catch (error) {
    console.log(error);
  }
};

const getBooWithId = async (req, res) => {
  try {
    const findBookById = await BookModel.findById(req.params.id);
    if (!findBookById) return res.status(404).send("Product not found");
    res.send(findBookById);
  } catch (error) {
    console.log(error);
  }
};

const addBook = async (req, res) => {
  try {
    const addInBook = new BookModel(req.body);
    await addInBook.save();
    res.status(200).send("Item Added successfully");
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  
};

const updateBook = async (req, res) => {
  res.send("hello iam update");
};

module.exports = { getBooks, updateBook, deleteBook, addBook, getBooWithId };
