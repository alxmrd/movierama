import { nowPlayingMoviesWithGenres } from "../utils/movieDataProvider";
const domain = "https://api.themoviedb.org/3/";
const api_key = `api_key=${process.env.REACT_APP_MOVIES_API_KEY}`;
const nowPlayingMoviesPath = "movie/now_playing?";
const genrePath = "genre/movie/list?";

export const api = {
  getNowPlayingMovies: () => apiFetcher(nowPlayingMoviesPath),
  getGenres: () => apiFetcher(genrePath),
  getNowPlayingMoviesWithGenres: async () =>
    nowPlayingMoviesWithGenres(
      await api.getNowPlayingMovies(),
      await api.getGenres()
    ),
};

async function apiFetcher(path) {
  const url = domain + path + api_key;
  const response = await fetch(url);
  return response.json();
}
