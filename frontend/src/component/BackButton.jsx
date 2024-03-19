import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
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
