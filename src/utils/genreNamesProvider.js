export function getGenreNames(genreDataArr) {
  let genreNamesArray = [];

  genreDataArr.map((genre) => {
    return genreNamesArray.push(genre.name);
  });

  return Boolean(genreNamesArray.length) ? genreNamesArray.join(", ") : "";
}
