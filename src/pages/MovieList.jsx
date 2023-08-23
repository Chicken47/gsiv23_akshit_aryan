import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useRecoilState } from "recoil";
import { movieList } from "../state";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useRecoilState(movieList);
  const [searchQuery, setSearchquery] = useState("");
  useEffect(() => {
    setSearchquery("");
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTEzNzJlZjE5NDQ5YjI4MzE1NWIwYjE5M2Q2Yjk3MiIsInN1YiI6IjY0ZDEyMzA5ZDhkMzI5MDExZTc0YjQwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mx3HUCJnZ96zwrtpC5F5XU_9BIjika6PyFpiHgROrBA",
      },
    };

    fetch("https://api.themoviedb.org/3/movie/upcoming", options)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  const upcomingMovies = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTEzNzJlZjE5NDQ5YjI4MzE1NWIwYjE5M2Q2Yjk3MiIsInN1YiI6IjY0ZDEyMzA5ZDhkMzI5MDExZTc0YjQwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mx3HUCJnZ96zwrtpC5F5XU_9BIjika6PyFpiHgROrBA",
      },
    };

    fetch("https://api.themoviedb.org/3/movie/upcoming", options)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (searchQuery === "") {
      upcomingMovies();
    }
  }, [searchQuery]);

  const searchMovie = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOTEzNzJlZjE5NDQ5YjI4MzE1NWIwYjE5M2Q2Yjk3MiIsInN1YiI6IjY0ZDEyMzA5ZDhkMzI5MDExZTc0YjQwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mx3HUCJnZ96zwrtpC5F5XU_9BIjika6PyFpiHgROrBA",
      },
    };

    if (searchQuery !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response.results);
          setMovies(response.results);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="w-full flex flex-col bg-white font-sans">
      <div className="w-full px-5 py-3 shadow-lg flex justify-between items-center">
        <div className="flex md:w-1/2 w-10/12 space-x-5 items-center">
          <input
            placeholder="Search Movies"
            className="px-3 w-full py-2 bg-gray-200 rounded text-black transition-all"
            value={searchQuery}
            onChange={(e) => setSearchquery(e.target.value)}
          />
          <img
            src="/search-icon.png"
            className="w-[28px] h-[28px] hover:scale-125 transition-all cursor-pointer"
            alt=""
            onClick={() => searchMovie()}
          />
          {searchQuery && (
            <img
              src="/close-icon.png"
              className="w-[20px] h-[20px] hover:scale-125 transition-all cursor-pointer"
              alt=""
              onClick={() => setSearchquery("")}
            />
          )}
        </div>
        <span>
          <img
            src="/home-icon.png"
            className="w-[32px] cursor-pointer hover:scale-125 transition-all"
            alt="go-home"
          />
        </span>
      </div>
      <div className="w-full flex flex-wrap justify-around">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average}
            posterLink={movie.poster_path}
            description={movie.overview}
            movieId={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
