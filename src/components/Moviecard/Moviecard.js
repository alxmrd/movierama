import React, { Fragment } from "react";
import { getGenreNames } from "../../utils/genreNamesProvider";
import { getImages } from "../../utils/imagesProvider";
import { getDate } from "../../utils/yearProvider";
import "./Moviecard.css";
import "./ExpandedCard.css";

function Moviecard({
  movies,
  expandedRowIdClicked,
  isExpanded,
  expandedRowId,
  movieInfos,
}) {
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
            <th>More Infos</th>
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
                <td>
                  <button
                    onClick={() => {
                      expandedRowIdClicked(movie.id, !isExpanded);
                    }}
                  >
                    alex
                  </button>
                </td>
              </tr>

              {Boolean(isExpanded) && movie.id === expandedRowId ? (
                <tr>
                  <td colspan="7">
                    <div class="row">
                      <div class="column">Videos</div>
                      <div class="column">Similar</div>
                      {movieInfos?.reviews?.results?.map((review) => (
                        <div>
                          <table className="Moviecard-table">
                            <thead>
                              <tr>
                                <th> {review.author}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr key={review.id}>
                                <td>{review.content}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Moviecard;
