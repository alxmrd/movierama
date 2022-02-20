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
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useInfinityScroll(getMoreData);
  const [expandedRowId, setExpandedMovieId] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  let moviesData;
  async function getData() {
    if (Boolean(query)) {
      let searchedMoviesApi = await api.getSearchOnMovies(page, query);
      setSearchedMovies(searchedMoviesApi);

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

  useEffect(() => {
    getData();
  }, [query]);

  const expanderRowClicked = (movieId, isExpandedRow) => {
    setIsExpanded(isExpandedRow);
    if (movieId === expandedRowId && Boolean(isExpandedRow)) {
      setIsExpanded(!isExpanded);
    } else if (movieId !== expandedRowId) {
      setIsExpanded(isExpanded);
    }
    setExpandedMovieId(movieId);
    getMovieInfos(movieId);
  };

  async function getMovieInfos(movieId) {
    const movieVideos = await api
      .getMovieVideos(movieId)
      .catch((e) => setError(e.message));

    const movieReviews = await api
      .getMovieReviews(movieId)
      .catch((e) => setError(e.message));

    const movieSimilar = await api
      .getMovieSimilar(movieId)
      .catch((e) => setError(e.message));

    const movieInfosData = {
      videos: await movieVideos,
      reviews: await movieReviews,
      similar: await movieSimilar,
    };

    setMovieInfos(movieInfosData);
  }

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
