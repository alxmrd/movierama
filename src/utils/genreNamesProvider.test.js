import { getGenreNames } from "./genreNamesProvider";

it("returns string with the genre names comma separated", () => {
  const genreInfos = [
    { id: 27, name: "Horror" },
    { id: 9648, name: "Mystery" },
    { id: 53, name: "Thriller" },
  ];
  const expextedResult = "Horror, Mystery, Thriller";
  expect(getGenreNames(genreInfos)).toEqual(expextedResult);
});
