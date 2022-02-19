export async function nowPlayingMoviesWithGenres(nowPlayingMovies, genresMap) {
  //loop through now playing movies
  return nowPlayingMovies.results.map((movie) => {
    let moviesWithGenres = {};
    let genreInfos = [];

    if (Boolean(movie.genre_ids.length)) {
      //loop through each genre id
      for (const genreId of movie.genre_ids) {
        // match each id with its name
        genresMap.genres.map((genre) => {
          if (genreId === genre.id) {
            genreInfos.push({ id: genre.id, name: genre.name });
          }
          return (moviesWithGenres = { ...movie, genreInfos });
        });
      }
      return moviesWithGenres;
    } else {
      return (moviesWithGenres = { ...movie });
    }
  });
}
