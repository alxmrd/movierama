import { moviesWithGenres } from "./movieDataProvider";

describe("If there are no genre ids ", () => {
  it("return the movies without genre infos", async () => {
    const movies = {
      results: [
        {
          adult: false,
          backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
          genre_ids: [],
          id: 634649,
          original_language: "en",
          original_title: "Spider-Man: No Way Home",
          overview:
            "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          popularity: 7539.194,
          poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
          release_date: "2021-12-15",
          title: "Spider-Man: No Way Home",
          video: false,
          vote_average: 8.4,
          vote_count: 7912,
        },
      ],
    };

    const genres = {
      genres: [
        {
          id: 28,
          name: "Action",
        },
        {
          id: 12,
          name: "Adventure",
        },
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 35,
          name: "Comedy",
        },
        {
          id: 80,
          name: "Crime",
        },
        {
          id: 99,
          name: "Documentary",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10751,
          name: "Family",
        },
        {
          id: 14,
          name: "Fantasy",
        },
        {
          id: 36,
          name: "History",
        },
        {
          id: 27,
          name: "Horror",
        },
        {
          id: 10402,
          name: "Music",
        },
        {
          id: 9648,
          name: "Mystery",
        },
        {
          id: 10749,
          name: "Romance",
        },
        {
          id: 878,
          name: "Science Fiction",
        },
        {
          id: 10770,
          name: "TV Movie",
        },
        {
          id: 53,
          name: "Thriller",
        },
        {
          id: 10752,
          name: "War",
        },
        {
          id: 37,
          name: "Western",
        },
      ],
    };

    const expectedResult = [
      {
        adult: false,
        backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
        genre_ids: [],
        id: 634649,
        original_language: "en",
        original_title: "Spider-Man: No Way Home",
        overview:
          "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        popularity: 7539.194,
        poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        release_date: "2021-12-15",
        title: "Spider-Man: No Way Home",
        video: false,
        vote_average: 8.4,
        vote_count: 7912,
      },
    ];

    expect(await moviesWithGenres(movies, genres)).toStrictEqual(
      expectedResult
    );
  });
});

describe("If there are genre ids ", () => {
  it("creates a new array with genre infos", async () => {
    const movies = {
      results: [
        {
          adult: false,
          backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
          genre_ids: [28, 12, 878],
          id: 634649,
          original_language: "en",
          original_title: "Spider-Man: No Way Home",
          overview:
            "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
          popularity: 7539.194,
          poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
          release_date: "2021-12-15",
          title: "Spider-Man: No Way Home",
          video: false,
          vote_average: 8.4,
          vote_count: 7912,
        },
      ],
    };

    const genres = {
      genres: [
        {
          id: 28,
          name: "Action",
        },
        {
          id: 12,
          name: "Adventure",
        },
        {
          id: 16,
          name: "Animation",
        },
        {
          id: 35,
          name: "Comedy",
        },
        {
          id: 80,
          name: "Crime",
        },
        {
          id: 99,
          name: "Documentary",
        },
        {
          id: 18,
          name: "Drama",
        },
        {
          id: 10751,
          name: "Family",
        },
        {
          id: 14,
          name: "Fantasy",
        },
        {
          id: 36,
          name: "History",
        },
        {
          id: 27,
          name: "Horror",
        },
        {
          id: 10402,
          name: "Music",
        },
        {
          id: 9648,
          name: "Mystery",
        },
        {
          id: 10749,
          name: "Romance",
        },
        {
          id: 878,
          name: "Science Fiction",
        },
        {
          id: 10770,
          name: "TV Movie",
        },
        {
          id: 53,
          name: "Thriller",
        },
        {
          id: 10752,
          name: "War",
        },
        {
          id: 37,
          name: "Western",
        },
      ],
    };

    const expectedResult = [
      {
        adult: false,
        backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
        genreInfos: [
          { id: 28, name: "Action" },
          { id: 12, name: "Adventure" },
          { id: 878, name: "Science Fiction" },
        ],
        genre_ids: [28, 12, 878],
        id: 634649,
        original_language: "en",
        original_title: "Spider-Man: No Way Home",
        overview:
          "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        popularity: 7539.194,
        poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        release_date: "2021-12-15",
        title: "Spider-Man: No Way Home",
        video: false,
        vote_average: 8.4,
        vote_count: 7912,
      },
    ];

    expect(await moviesWithGenres(movies, genres)).toStrictEqual(
      expectedResult
    );
  });
});
