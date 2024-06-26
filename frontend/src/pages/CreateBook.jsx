import React, { useState } from "react";
import axios from "axios";
import Spinner from "../component/Spinner";
import BackButton from "../component/BackButton";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [publishYear, setPublishYear] = useState();
  const [loading, setLoading] = useState();
  // useNavigate is a hook that allows you to navigate to a different page.
  const navigate = useNavigate();

  // This function will be called when the user clicks the "Add book" button.
  const handleSaveBook = () => {
    // in JavaScript, when the property name and the variable name are the same, you can use the shorthand syntax.
    // So title: title can be shortened to just title.
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    // Send a POST request to the server to save the book.
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        // After the book is saved, redirect the user to the home page.
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("Unable to upload book, please try again");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <div className="flex justify-center items-center my-5">
        <h1 className="text-3xl my-3">Add a book</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-4 border-sky-800 rounded-xl w-[600px] p-4 mx-auto">
        {/* The input fields are controlled components. The value of the input fields is set to the state variables. */}
        <div className="my-4">
          <label className="text-xl mr-4">Title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-2 border-gray-500 w-full px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4">Author : </label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            className="border-2 border-gray-500 w-full px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4">Year published :</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => {
              setPublishYear(e.target.value);
            }}
            className="border-2 border-gray-500 w-full px-4 py-2"
          />
        </div>
        <button onClick={handleSaveBook} className="p-2 bg-sky-800 m-8 rounded-xl cursor-pointer">
          <h1 className="text-2xl">Add book</h1>
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
