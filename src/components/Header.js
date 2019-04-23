import React from "react";
import { connect } from "react-redux";
import ViewMovie from "./ViewMovie";

function Header(props) {
  let nowPlaying = props.nowPlaying.splice(0, 4);

  return (
    <header className="home_container">
      {nowPlaying.map(movie => (
        <div
          className="movie_section"
          key={movie.id}
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${
              movie.backdrop_path
            }"`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >
          <div className="home_content">
            <h1 style={{ marginBottom: "10px" }}>{movie.title}</h1>
            {/* <p style={{ margin: "5px 0 10px" }}>{movie.overview}</p> */}
            <ViewMovie movie={movie.id} />
          </div>
          {/* <div className="blur" /> */}
          <div className="overlay" />
          <div className="right_line" />
          <div className="bottom_line" />
          {/* <div className="dec_square" /> */}
          <div className="bottom_line_text">
            <h3>{movie.title}</h3>
          </div>
        </div>
      ))}
    </header>
  );
}

const mapStateToProps = state => {
  return {
    nowPlaying: state.nowPlaying
  };
};

export default connect(mapStateToProps)(Header);
