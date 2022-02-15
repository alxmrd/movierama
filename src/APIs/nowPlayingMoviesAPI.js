import React, { useEffect, useState } from "react";

export default function NowPlayingMovies() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [movies, setItems] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} {movie.overview}
          </li>
        ))}
      </ul>
    );
  }
}
