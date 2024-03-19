import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// route to save a new book
router.post("/", async (req, res) => {
  // try to save a new book
  try {
    // check if all required fields are included
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      // if the required fields are not included, return an error message
      return res.status(400).json({
        message: "inculde all required fields: title, author and publishYear",
      });
    } else {
      // if all required fields are included, create a new book object
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };

      // save the new book object to the database
      const book = await Book.create(newBook);
      // return the saved book object and a status code of 201
      return res.status(201).send(book);
    }
    // if there is an error, return an error message and a status code of 500
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//  route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//  route to get a book by its ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "invalid book ID" });
    } else {
      return res.status(200).send(book);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// route to update a book by its ID
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: "send all required fields: title, author and publishYear",
      });
    } else {
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(400).json({ message: "invalid book ID" });
      } else {
        return res.status(200).json({
          message: "book updated successfully",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// route to delete a book by its ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "invalid book ID" });
    } else {
      return res.status(200).json({ message: "book deleted successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
