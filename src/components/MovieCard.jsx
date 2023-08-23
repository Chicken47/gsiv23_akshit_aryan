import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ posterLink, title, rating, description, movieId }) => {
  return (
    <Link
      to={`/details/${movieId}`}
      className="w-[45%] bg-gradient-to-r from-gray-200 to-gray-300 md:w-[28%] lg:w-[17%] flex flex-col h-[400px] bg-gray-200 rounded-lg hover:scale-105 duration-300 cursor-pointer transition-all mt-5 shadow-xl"
    >
      <img
        src={`https://image.tmdb.org/t/p/w1280${posterLink}`}
        className="w-full h-4/5 rounded-t-lg object-cover object-top"
        alt=""
      />
      <div className="p-3 flex flex-col items-start justify-evenly text-[13px] h-full">
        <div className="w-full flex justify-between items-center font-bold">
          <span className="line-clamp-1">{title}</span>
          <span>{rating}</span>
        </div>
        <span className="line-clamp-2">{description}</span>
      </div>
    </Link>
  );
};

export default MovieCard;
