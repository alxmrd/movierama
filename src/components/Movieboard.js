import React, { useState, useEffect } from "react";
import Moviecard from "./Moviecard/Moviecard";
import { api } from "../api/dataFetcher";
import "./Movieboard.css";
import useInfinityScroll from "../utils/useInfinityScroll";

function Movieboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfinityScroll(getMoreData);

  async function getData() {
    const moviesData = await api.getNowPlayingMoviesWithGenres(page);

    setMovies(moviesData);
    setLoading(false);
    setPage(page + 1);
  }
  async function getMoreData() {
    const moviesData = await api.getNowPlayingMoviesWithGenres(page);

    setMovies([...movies, ...moviesData]);
    setPage(page + 1);
    setIsFetching(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (movies.length === 0) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="Movieboard">
      <main>{loading ? <div>alex</div> : <Moviecard movies={movies} />}</main>
      {isFetching && <h1>"Fetching more list items..."</h1>}
    </div>
  );
}

export default Movieboard;
