import React, { Component } from "react";
import Swiper from "./Swiper";
import { connect } from "react-redux";
import { loadNowPlaying } from "../../actions/categoriesActions";
import { singleMovie, loadTrailer, loadActors } from "../../actions/actions";
import { withRouter } from "react-router-dom";

let nowPlayingSlider = React.createRef();
let _mounted = false;

class NowPlaying extends Component {
  componentDidMount = () => {
    _mounted = true;
    if (_mounted) {
      this.props.onNowPlaying();
    }
  };

  componentWillUnmount() {
    _mounted = false;
  }

  handleClick = id => {
    this.props.onsingleMovie(id);
    this.props.onLoadActors(id);
    this.props.onLoadTrailer(id);
    this.props.history.push(`/movie/${id}`);
  };

  render() {
    return (
      <Swiper
        slider={nowPlayingSlider}
        movies={this.props.nowPlaying}
        handleClick={this.handleClick}
        category={"Now Playing"}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    nowPlaying: state.nowPlaying
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNowPlaying: () => dispatch(loadNowPlaying()),
    onsingleMovie: id => dispatch(singleMovie(id)),
    onLoadTrailer: id => dispatch(loadTrailer(id)),
    onLoadActors: id => dispatch(loadActors(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NowPlaying)
);
