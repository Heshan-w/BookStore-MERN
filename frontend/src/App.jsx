import React from "react";
import { Routes, Route } from "react-router-dom";
// import the pages, which are components that represent a page of the application.
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";

const App = () => {
  return (
    <div className="bg-slate-400 h-screen">
      {/* The Routes component is used to define the routes of the application. */}
      <Routes>
        {/* The path prop is used to define the URL path, and the element prop is 
        used to define the component that should be rendered when the URL matches the path. */}
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
      </Routes>
    </div>
  );
};

export default App;
