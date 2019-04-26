import React from "react";
import Search from "./Search";
import Favorites from "./Favorites";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetMovie, resetMovies, resetPersonIMDB } from "../actions/actions";

function NavBar(props) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#18181E",
        borderBottom: "solid 1px #DEC79B"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
          margin: "0 auto",
          height: "8vh",
          position: "relative",
          padding: "30px 0"
        }}
      >
        <Link
          onClick={() => (
            props.onResetMovie(),
            props.onResetMovies(),
            props.onResetPersonIMDB()
          )}
          to="/"
          style={{ textDecoration: "none" }}
        >
          <h1 className="text_logo">CloudFlick</h1>
        </Link>

        <Search />
        <Favorites />
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onResetMovie: () => dispatch(resetMovie()),
    onResetMovies: () => dispatch(resetMovies()),
    onResetPersonIMDB: () => dispatch(resetPersonIMDB())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
