import React from "react";
// import Favorite from "../Favorite";
import ViewMovie from "../ViewMovie";
import { connect } from "react-redux";
import {
  singleMovie,
  loadTrailer,
  loadActors,
  resetMovies
} from "../../actions/actions";
import { withRouter, Link } from "react-router-dom";

function Movies(props) {
  return (
    <React.Fragment>
      <div style={{ width: "80%", margin: "35px auto 0" }}>
        <Link to="/" style={{ color: "#18181e" }}>
          Home
        </Link>
      </div>
      {props.movies.length !== 0 && (
        <div className="moviesGrid">
          {props.movies.map(
            movie =>
              movie.poster_path && (
                <div key={movie.id} className="moviesGridItem">
                  <div
                    className="moviesGridImg"
                    onClick={() => {
                      props.onsingleMovie(movie.id);
                      props.onLoadTrailer(movie.id);
                      props.onLoadActors(movie.id);
                      props.onResetMovies();
                      props.history.push(`/movie/${movie.id}`);
                    }}
                  >
                    <img
                      src={
                        movie.poster_path &&
                        `https://image.tmdb.org/t/p/w185//${movie.poster_path}`
                      }
                      alt={movie.title}
                      style={{ height: "300px", minWidth: "250px" }}
                    />
                  </div>
                  <div className="moviesGridBottom">
                    <h3 style={{ marginBottom: "6px" }}>
                      {movie.title.length < 20
                        ? movie.title
                        : movie.title.substring(0, 20) + "..."}
                    </h3>
                    <ViewMovie movie={movie.id} />
                    {/* <Favorite movie={movie} id={movie.id} /> */}
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* if there are no movie results */}
      {props.movies.length === 0 && (
        <div
          style={{
            height: "92vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1>We Cannot Find Your Search. Please Try Another Film...</h1>
        </div>
      )}
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onsingleMovie: id => dispatch(singleMovie(id)),
    onLoadTrailer: id => dispatch(loadTrailer(id)),
    onLoadActors: id => dispatch(loadActors(id)),
    onResetMovies: () => dispatch(resetMovies())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Movies)
);
