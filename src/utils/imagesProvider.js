export function getImages(path) {
  const domain = "https://image.tmdb.org";
  const url = new URL(domain);

  if (Boolean(path)) {
    url.pathname = "t/p/w500" + path;
    return url.toString();
  } else {
    return "";
  }
}
