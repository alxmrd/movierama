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
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfinityScroll(getMoreData);
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandState, setExpandState] = useState({});

  const handleEpandRow = (event, movieId) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(movieId);

    let obj = {};
    isRowExpanded ? (obj[movieId] = false) : (obj[movieId] = true);
    setExpandState(obj);

    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== movieId)
      : currentExpandedRows.concat(movieId);

    setExpandedRows(newExpandedRows);
  };

  let moviesData;
  async function getData() {
    if (Boolean(query)) {
      let searchedMoviesApi = await api.getSearchOnMovies(page, query);
      setSearchedMovies(searchedMoviesApi);
      console.log(searchedMoviesApi, "alex");

      moviesData = await moviesWithGenres(
        searchedMovies,
        await api.getGenres()
      );
      if (Boolean(searchedMovies.results.length) === 0) {
        moviesData = await moviesWithGenres(
          await api.getNowPlayingMovies(page),
          await api.getGenres()
        );
      }
    } else {
      moviesData = await moviesWithGenres(
        await api.getNowPlayingMovies(page),
        await api.getGenres()
      );
    }
    setMovies(moviesData);
    setLoading(false);
    setPage(page + 1);
  }
  async function getMoreData() {
    if (Boolean(query)) {
      moviesData = await moviesWithGenres(
        await api.getSearchOnMovies(page, query),
        await api.getGenres()
      );
    } else {
      moviesData = await moviesWithGenres(
        await api.getNowPlayingMovies(page),
        await api.getGenres()
      );
    }

    setMovies([...movies, ...moviesData]);
    setPage(page + 1);
    setIsFetching(false);
  }

  async function getSearchedData() {
    console.log(query);
    const moviesData = await api.getSearchOnMovies(page, query);
    console.log("movies", moviesData);
  }

  useEffect(() => {
    getData();
  }, [query]);

  const expanderRowClicked = (movieId, index) => {
    // the callback. Use a better name
    console.log(index);
    console.log(movieId);
  };

  return (
    <div>
      <input
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="Movieboard">
        <main>
          {loading ? (
            <div>alex</div>
          ) : (
            <Moviecard
              movies={movies}
              expandedRowIdClicked={expanderRowClicked}
            />
          )}
        </main>
        {isFetching && <h1>"Fetching more list items..."</h1>}
      </div>
    </div>
  );
}

export default Movieboard;
