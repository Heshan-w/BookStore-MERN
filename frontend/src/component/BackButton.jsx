import React from "react";
// The Link component is used to create a link to another page in the application.
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

// The destination property is used to define the URL path of the link.
// Note: The default value of the destination property is "/".
const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      {/* The to prop is used to define the URL path of the link. */}
      <Link
        to={destination}
        className="flex justify-center items-center bg-sky-800 text-white px-4 py-1 rounded-lg h-10 w-fit"
      >
        <BsArrowLeft text-2xl />
      </Link>
    </div>
  );
};

export default BackButton;
