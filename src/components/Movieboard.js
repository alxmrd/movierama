import React, { useState, useEffect } from "react";
import Moviecard from "./Moviecard/Moviecard";
import { api } from "../api/dataFetcher";
import "./Movieboard.css";
import useInfinityScroll from "../utils/useInfinityScroll";
import { moviesWithGenres } from "../utils/movieDataProvider";

function Movieboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieInfos, setMovieInfos] = useState([]);
  //const [searchedMovies, setSearchedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfinityScroll(handlePage);
  const [expandedRowId, setExpandedMovieId] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  async function getData() {
    setLoading(true);
    setIsFetching(true);

    if (isSearching) {
      const searchedMovies = await moviesWithGenres(
        await api.getSearchOnMovies(page, query),
        await api.getGenres()
      );

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
    // setMovies(moviesData);
    // setLoading(false);
    // setPage(page + 1);
  }

  function handlePage() {
    setPage((prevPage) => prevPage + 1);
  }
  //   setMovies([...movies, ...moviesData]);
  //   setPage(page + 1);
  //   setIsFetching(false);
  // }

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
      setError(e.message);
    }
  }

  return (
    <div>
      <input
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          setPage(1);
          setQuery(e.target.value);
          setMovies([]);
          setIsSearching(Boolean(e.target.value.length));
        }}
      />
      <div className="Movieboard">
        <main>
          {loading ? (
            <h2>Loading</h2>
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
        {isFetching && <h1>"Fetching more list items..."</h1>}
      </div>
    </div>
  );
}

export default Movieboard;
