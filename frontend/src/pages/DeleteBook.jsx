import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../component/BackButton";
import Spinner from "../component/Spinner";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [publishYear, setPublishYear] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  // to fetch the book details when the component is first rendered.
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Unable to fetch book");
      });
  }, []);

  // a function to delete the book.
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Unable to fetch book");
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <div className="flex justify-center items-center text-3xl my-8 text-red-800">
        Delete Book
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center justify-center border-4 border-sky-800 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl m-4">
          Are you sure you want to delete this book
        </h3>
        {/* The details of the book that is about to be deleted are displayed in this div. */}
        <div className="border-2 border-sky-800 rounded-xl p-3 m-2">
          <div>
            <span className="text-xl">Title : </span>
            <span>{title}</span>
          </div>
          <div>
            <span className="text-xl">Author : </span>
            <span>{author}</span>
          </div>
          <div>
            <span className="text-xl">Year of Publication : </span>
            <span>{publishYear}</span>
          </div>
        </div>
        {/* If the user clicks the Yes button, the handleDeleteBook function is called. */}
        <button
          onClick={handleDeleteBook}
          className="p-2 bg-red-800 text-white mt-8 rounded-xl cursor-pointer w-[100px]"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
