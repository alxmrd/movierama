// import { nowPlayingMoviesWithGenres } from "../utils/movieDataProvider";
const domain = "https://api.themoviedb.org";
const apikeyParamStr = "api_key";
const pageStr = "page";
const queryStr = "query";
const nowPlayingMoviesPath = "3/movie/now_playing";
const genrePath = "3/genre/movie/list";
const searchPath = "3/search/movie";
const movieInfosPath = `3/movie/`;
const apiKey = "bc50218d91157b1ba4f142ef7baaa6a0";

export const api = {
  getNowPlayingMovies: (page) =>
    apiFetcher(nowPlayingMoviesPath, { page: page }),
  getGenres: () => apiFetcher(genrePath),
  getSearchOnMovies: (page, query) =>
    apiFetcher(searchPath, { page: page, query: query }),
  getMovieVideos: (movieId) =>
    apiFetcher(movieInfosPath, { movieId: movieId, videos: "videos" }),
  getMovieReviews: (movieId) =>
    apiFetcher(movieInfosPath, { movieId: movieId, reviews: "reviews" }),
  getMovieSimilar: (movieId) =>
    apiFetcher(movieInfosPath, { movieId: movieId, similar: "similar" }),
};

async function apiFetcher(path, arg) {
  let url = new URL(domain);
  url.pathname = path;
  url.searchParams.set(apikeyParamStr, apiKey);

  if (Boolean(arg?.page)) {
    url.searchParams.set(pageStr, arg.page);
  }

  if (Boolean(arg?.query)) {
    url.searchParams.set(queryStr, arg.query);
  }

  if (Boolean(arg?.movieId) && Boolean(arg?.videos)) {
    url.pathname = path + `${arg?.movieId}` + `/${arg?.videos}`;
  }

  if (Boolean(arg?.movieId) && Boolean(arg?.reviews)) {
    url.pathname = path + `${arg?.movieId}` + `/${arg?.reviews}`;
  }

  if (Boolean(arg?.movieId) && Boolean(arg?.similar)) {
    url.pathname = path + `${arg?.movieId}` + `/${arg?.similar}`;
  }
  const response = await fetch(url.toString());
  return response.json();
}
