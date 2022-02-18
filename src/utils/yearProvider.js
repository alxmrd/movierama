export function getDate(releaseDate) {
  const year = releaseDate.slice(0, releaseDate.indexOf("-"));
  return year;
}
