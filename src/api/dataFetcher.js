// import { nowPlayingMoviesWithGenres } from "../utils/movieDataProvider";
const domain = "https://api.themoviedb.org";
const apikeyParamStr = "api_key";
const pageStr = "page";
const queryStr = "query";
const nowPlayingMoviesPath = "3/movie/now_playing";
const genrePath = "3/genre/movie/list";
const searchPath = "3/search/movie";

export const api = {
  getNowPlayingMovies: (page) => apiFetcher(nowPlayingMoviesPath, page),
  getGenres: () => apiFetcher(genrePath),
  getSearchOnMovies: (page, query) => apiFetcher(searchPath, page, query),
};

async function apiFetcher(path, page, query) {
  let url = new URL(domain);
  url.pathname = path;
  url.searchParams.set(apikeyParamStr, process.env.REACT_APP_MOVIES_API_KEY);

  if (Boolean(page)) {
    url.searchParams.set(pageStr, page);
  }

  if (Boolean(query)) {
    url.searchParams.set(queryStr, query);
    console.log("url", url);
  }

  const response = await fetch(url.toString());
  return response.json();
}
