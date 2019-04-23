import React from "react";
import { connect } from "react-redux";
import {
  singleMovie,
  loadTrailer,
  loadActors,
  resetMovies
} from "../actions/actions";
import { withRouter } from "react-router-dom";

function ViewMovie(props) {
  return (
    <div
      onClick={() => {
        props.onsingleMovie(props.movie);
        props.onLoadActors(props.movie);
        props.onLoadTrailer(props.movie);
        props.onResetMovies();
        props.history.push(`/movie/${props.movie}`);
      }}
      style={{
        cursor: "pointer",
        backgroundColor: "#18181E",
        padding: "10px 20px",
        color: "#DEC79B",
        display: "inline-block"
      }}
    >
      <p>View Movie</p>
    </div>
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
  )(ViewMovie)
);
