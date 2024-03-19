import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../component/BackButton";
import Spinner from "../component/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error message :", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-4 h-screen w-screen">
      <div className="text-3xl mt-4">Book details</div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 m-7">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Book ID : </span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title : </span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author : </span>
            <span>{book.author}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Year of publication :
            </span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Book added to library on :
            </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>

          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Book last updated on :
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
      <BackButton />
    </div>
  );
};

export default ShowBook;
