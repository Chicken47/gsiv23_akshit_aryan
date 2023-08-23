import React from "react";
import { useRecoilState } from "recoil";
import { movieList } from "../state";
import { Link, useParams } from "react-router-dom";

const MovieDescription = () => {
  const { movieId } = useParams();
  const movies = useRecoilState(movieList);
  const listOfMovies = movies[0];
  const selectedMovie = listOfMovies.find(
    (movie) => movie?.id === Number(movieId)
  );

  console.log(listOfMovies[3].id);
  console.log(Number(movieId));

  return (
    <div className="w-full flex flex-col items-center justify-evenly">
      <div className="w-full px-5 py-3 shadow-lg flex justify-between items-center">
        <span className="font-bold">Movie Details</span>
        <Link to="/">
          <img
            src="/home-icon.png"
            className="w-[32px] hover:scale-125 transition-all cursor-pointer"
            alt=""
          />
        </Link>
      </div>
      <div className="w-full p-5 flex flex-col md:flex-row items-start h-full">
        <div
          id="image"
          className="p-3 w-full md:w-1/5 bg-gray-200 rounded h-full"
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280${selectedMovie?.poster_path}`}
            className="rounded"
            alt=""
          />
        </div>
        <div
          id="details"
          className="p-5 w-4/5 flex flex-col items-start space-y-1 h-full font-sans text-[20px]"
        >
          <div className="flex items-center space-x-10">
            <span className="font-bold">{selectedMovie?.title}</span>
            <span className="font-bold text-gray-600">
              ({selectedMovie?.vote_average})
            </span>
          </div>
          <span className="font-extrabold text-gray-400">
            {selectedMovie?.release_date}
          </span>
          <span className="md:w-2/3 text-[18px]">
            <b>Description:</b> {selectedMovie?.overview}
          </span>
          <button
            className="px-3 py-1 rounded bg-gray-800 text-white font-bold text-[16px]"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
