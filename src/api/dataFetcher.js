import { nowPlayingMoviesWithGenres } from "../utils/movieDataProvider";
const domain = "https://api.themoviedb.org";
const apikeyParamStr = "api_key";
const pageStr = "page";
const nowPlayingMoviesPath = "3/movie/now_playing";
const genrePath = "3/genre/movie/list";

export const api = {
  getNowPlayingMovies: (page) => apiFetcher(nowPlayingMoviesPath, page),
  getGenres: () => apiFetcher(genrePath),
  getNowPlayingMoviesWithGenres: async (page) =>
    nowPlayingMoviesWithGenres(
      await api.getNowPlayingMovies(page),
      await api.getGenres()
    ),
};

async function apiFetcher(path, page) {
  const url = new URL(domain);
  url.pathname = path;
  url.searchParams.set(apikeyParamStr, process.env.REACT_APP_MOVIES_API_KEY);
  if (Boolean(page)) {
    url.searchParams.set(pageStr, page);
  }

  const response = await fetch(url.toString());
  return response.json();
}
