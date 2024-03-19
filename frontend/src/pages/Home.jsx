import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../component/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  // books is a state variable that will store the list of books.
  const [books, setBooks] = useState([]);
  // loading is a state variable that will be used to show a loading spinner when the books are being fetched from the server.
  const [loading, setLoading] = useState(false);

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
        <div className="flex flex-col justify-center items-center mb-5">
          <Link to={"/books/create"}>
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
          <h1 className="text-xl">Add a book</h1>
        </div>
      </div>
      {/* if loading is not true, meaning the data has been fetched, a table will be displayed with the list of books. */}
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md bg-slate-600 text-gray-400">
                No.
              </th>
              <th className="border border-slate-600 rounded-md bg-slate-600 text-gray-400">
                Title
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden bg-slate-600 text-gray-400">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden bg-slate-600 text-gray-400">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md bg-slate-600 text-gray-400">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {/* The books state variable is mapped to create a table row for each book. */}
            {/* each object in the books arrya has the properties _id, title, author, and publishYear. */}
            {books.map((book, index) => {
              return (
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-600 rounded-md text-center">
                    {/* The index is used to display the number of the book in the list. */}
                    {index + 1}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center">
                    {book.title}
                  </td>
                  <td className="border border-slate-600 rounded-md max-md:hidden text-center">
                    {book.author}
                  </td>
                  <td className="border border-slate-600 rounded-md max-md:hidden text-center">
                    {book.publishYear}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>

                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-400" />
                      </Link>

                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
