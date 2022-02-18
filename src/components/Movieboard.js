import React, { useState, useEffect } from "react";
import Moviecard from "./Moviecard/Moviecard";
import { api } from "../api/dataFetcher";
// import "./Movieboard.css";

function Movieboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  async function getData() {
    try {
      const moviesData = await api.getNowPlayingMoviesWithGenres();
      setMovies(moviesData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Movieboard">
      <main>
        <Moviecard movies={movies} />
      </main>
    </div>
  );
}

export default Movieboard;
