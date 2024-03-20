import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../component/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../component/home/BooksTable";
import BooksCard from "../component/home/Bookscard";

const Home = () => {
  // books is a state variable that will store the list of books.
  const [books, setBooks] = useState([]);
  // loading is a state variable that will be used to show a loading spinner when the books are being fetched from the server.
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  // The useEffect hook is used to fetch the list of books from the server when the component is first rendered.
  useEffect(() => {
    setLoading(true);
    // Send a GET request to the server to fetch the list of books.
    axios
      .get("http://localhost:5555/books")
      // The response from the server is an object with a data property that contains the list of books.
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl my-5">Bookshelf</h1>
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table View
          </button>
          <button
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card View
          </button>
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <Link to={"/books/create"}>
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
          <h1 className="text-xl">Add a book</h1>
        </div>
      </div>
      {/* if loading is not true, meaning the data has been fetched, a table will be displayed with the list of books. */}
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
