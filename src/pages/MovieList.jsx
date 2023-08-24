import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useRecoilState } from "recoil";
import { movieList } from "../state";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useRecoilState(movieList);
  const [searchQuery, setSearchquery] = useState("");
  const [loading, setLoading] = useState(false);

  const upcomingMovies = () => {
    setLoading(true);
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
        setLoading(false);
        setMovies(response.results);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setSearchquery("");
    upcomingMovies();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      upcomingMovies();
    }
  }, [searchQuery]);

  const searchMovie = () => {
    setLoading(true);
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
          setLoading(false);
          setMovies(response.results);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col w-full font-sans bg-white">
      <div className="flex items-center justify-between w-full px-5 py-3 shadow-lg">
        <div className="flex items-center w-10/12 space-x-5 md:w-1/2">
          <input
            placeholder="Search Movies"
            className="w-full px-3 py-2 text-black transition-all bg-gray-200 rounded"
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
      {!loading ? (
        <div className="flex flex-wrap justify-around w-full">
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
      ) : (
        <div className="w-full flex flex-col items-center mt-[5vw]">
          <span className="h-1/2">
            <img src="https://i.gifer.com/XOsX.gif" />
          </span>
          <span className="font-bold text-[5vw]">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default MovieList;
