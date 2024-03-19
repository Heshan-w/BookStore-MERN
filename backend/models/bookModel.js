import mongoose from "mongoose";

// create a schema for the book model
// a schema is a blueprint for how the database will be constructed
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publishYear: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// create a model for the book schema
export const Book = mongoose.model("Book", bookSchema);
