import React, { Component } from "react";
import Swiper from "./Swiper";
import { connect } from "react-redux";
import { loadTopRated } from "../../actions/categoriesActions";
import { singleMovie, loadTrailer, loadActors } from "../../actions/actions";
import { withRouter } from "react-router-dom";

let topRatedSlider = React.createRef();
let _mounted = false;

class TopRated extends Component {
  componentDidMount = () => {
    _mounted = true;
    if (_mounted) {
      this.props.onTopRated();
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
        slider={topRatedSlider}
        movies={this.props.topRated}
        handleClick={this.handleClick}
        category={"Top Rated"}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    topRated: state.topRated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTopRated: () => dispatch(loadTopRated()),
    onsingleMovie: id => dispatch(singleMovie(id)),
    onLoadTrailer: id => dispatch(loadTrailer(id)),
    onLoadActors: id => dispatch(loadActors(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopRated)
);
