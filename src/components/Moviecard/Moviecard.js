import React, { Fragment } from "react";
import { getDate } from "../../utils/yearProvider";
import "./Moviecard.css";

function Moviecard({ movies }) {
  if (!movies || movies.length === 0) {
    return <div>No movies loaded</div>;
  }

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
                  <img src={movie.poster_path} width="100" alt />
                </td>
                <td>{movie.title}</td>
                <td>{getDate(movie.release_date)}</td>
                <td>{movie.title}</td>
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
