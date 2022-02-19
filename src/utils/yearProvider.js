export function getDate(releaseDate) {
  if (Boolean(releaseDate)) {
    return releaseDate.slice(0, releaseDate.indexOf("-"));
  }
}
