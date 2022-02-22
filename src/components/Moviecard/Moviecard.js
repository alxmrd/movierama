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
  if (!movies || movies.length === 0) {
    return <h2>Loading...</h2>;
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
            <th>More Infos</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <Fragment>
              <tr key={movie.id}>
                <td>
                  <img src={getImages(movie.poster_path)} width={180} alt />
                </td>
                <td>{movie.title}</td>
                <td>{getDate(movie.release_date)}</td>
                <td>{getGenreNames(movie.genreInfos)}</td>
                <td>{movie.vote_average}</td>
                <td>{movie.overview}</td>
                <td>
                  {
                    <button
                      onClick={() => {
                        expandedRowIdClicked(movie.id);
                      }}
                    >
                      {movie.id === expandedRowId && isExpanded ? (
                        <span class="minus">
                          <i class="fa fa-minus"></i>
                        </span>
                      ) : (
                        <span class="plus">
                          <i class="fa fa-plus"></i>
                        </span>
                      )}
                    </button>
                  }
                </td>
              </tr>

              {isExpanded && movie.id === expandedRowId ? (
                <div>
                  {movieInfos?.reviews?.results?.slice(0, 2).map((review) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "20px",
                        padding: "10px",
                      }}
                    >
                      <h1
                        style={{
                          marginBottom: "10px",
                        }}
                      >
                        REVIEWS
                      </h1>
                      <h2
                        style={{
                          marginBottom: "20px",
                        }}
                      >
                        {review.author.toUpperCase()}
                      </h2>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        key={review.id}
                      >
                        <span class="item">{review.content}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Moviecard;
