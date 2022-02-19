import React, { Fragment } from "react";
import { getGenreNames } from "../../utils/genreNamesProvider";
import { getImages } from "../../utils/imagesProvider";
import { getDate } from "../../utils/yearProvider";
import "./Moviecard.css";

function Moviecard({ movies }) {
  return (
    <div className="Moviecard">
      <table className="Moviecard-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Year of release</th>
            <th>Genre(s)</th>
            <th>Vote average</th>
            <th>Overview</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <Fragment>
              <tr key={movie.id}>
                <td>
                  <img src={getImages(movie.poster_path)} width={100} alt />
                </td>
                <td>{movie.title}</td>
                <td>{getDate(movie.release_date)}</td>
                <td>{getGenreNames(movie.genreInfos)}</td>
                <td>{movie.vote_average}</td>
                <td>{movie.overview}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Moviecard;
