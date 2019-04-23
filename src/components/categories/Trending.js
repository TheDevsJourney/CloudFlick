import React, { Component } from "react";
import Swiper from "./Swiper";
import { connect } from "react-redux";
import { loadTrending } from "../../actions/categoriesActions";
import { singleMovie, loadTrailer, loadActors } from "../../actions/actions";
import { withRouter } from "react-router-dom";

let trendingSlider = React.createRef();
let _mounted = false;

class Trending extends Component {
  componentDidMount = () => {
    _mounted = true;
    if (_mounted) {
      this.props.onLoadTrending();
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
        movies={this.props.trending}
        handleClick={this.handleClick}
        category={"Trending"}
        slider={trendingSlider}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    trending: state.trending
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadTrending: () => dispatch(loadTrending()),
    onsingleMovie: id => dispatch(singleMovie(id)),
    onLoadTrailer: id => dispatch(loadTrailer(id)),
    onLoadActors: id => dispatch(loadActors(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trending)
);
