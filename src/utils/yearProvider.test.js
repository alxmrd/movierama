import { getDate } from "./yearProvider";

it("translates dates to year", () => {
  const releaseDate = "2022-12-06";
  const expextedDate = "2022";
  expect(getDate(releaseDate)).toEqual(expextedDate);
});
