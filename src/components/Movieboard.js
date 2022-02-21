import React, { useState, useEffect } from "react";
import Moviecard from "./Moviecard/Moviecard";
import { api } from "../api/dataFetcher";
import "./Movieboard.css";
import "./SearchInput.css";
import useInfinityScroll from "../utils/useInfinityScroll";
import { moviesWithGenres } from "../utils/movieDataProvider";
import Loader from "./Loader";

function Movieboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieInfos, setMovieInfos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfinityScroll(handlePage);
  const [expandedRowId, setExpandedMovieId] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [noMoviesFound, setIsNoMoviesFound] = useState(false);

  async function getData() {
    setIsFetching(true);
    if (isSearching) {
      const searchedMovies = await moviesWithGenres(
        await api.getSearchOnMovies(page, query),
        await api.getGenres()
      );
      if (!Boolean(searchedMovies.length)) {
        setIsNoMoviesFound(true);
      } else {
        setIsNoMoviesFound(false);
      }

      setMovies((prevMovies) => {
        return [...prevMovies, ...searchedMovies];
      });
    } else {
      const moviesData = await moviesWithGenres(
        await api.getNowPlayingMovies(page),
        await api.getGenres()
      );
      setMovies((prevMovies) => {
        return [...prevMovies, ...moviesData];
      });
    }

    setLoading(false);
    setIsFetching(false);
  }

  function handlePage() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    getData();
  }, [query, page]);

  const expanderRowClicked = (movieId) => {
    if (movieId === expandedRowId) {
      setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    } else {
      setIsExpanded(true);
    }
    setExpandedMovieId(movieId);
    getMovieInfos(movieId);
  };

  async function getMovieInfos(movieId) {
    const calls = [
      api.getMovieVideos(movieId),
      api.getMovieReviews(movieId),
      api.getMovieSimilar(movieId),
    ];

    try {
      const [videos, reviews, similar] = await Promise.all(calls);

      const movieInfosData = {
        videos,
        reviews,
        similar,
      };
      setMovieInfos(movieInfosData);
    } catch (e) {
      setError(error);
    }
  }

  return (
    <div>
      <center>
        <div class="wrapper">
          <input
            class="searchbar"
            placeholder="Search movies..."
            type="text"
            title="Search"
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
              setMovies([]);
              setIsSearching(Boolean(e.target.value.length));
            }}
          />
          <i class="fa fa-search"></i>
        </div>
        <div className="Movieboard">
          <main>
            {loading ? (
              ""
            ) : noMoviesFound ? (
              <h1>No Movies found</h1>
            ) : (
              <Moviecard
                movies={movies}
                expandedRowIdClicked={expanderRowClicked}
                isExpanded={isExpanded}
                expandedRowId={expandedRowId}
                movieInfos={movieInfos}
              />
            )}
          </main>
          {isFetching && <Loader />}
        </div>
      </center>
    </div>
  );
}

export default Movieboard;
