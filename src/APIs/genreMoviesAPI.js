import React, { useEffect, useState } from "react";

export default function GenreMovies() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [genres, setItems] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIES_API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.genres);
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
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
    );
  }
}
