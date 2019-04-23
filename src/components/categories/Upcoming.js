import React, { Component } from "react";
import Swiper from "./Swiper";
import { connect } from "react-redux";
import { loadUpcoming } from "../../actions/categoriesActions";
import { singleMovie, loadTrailer, loadActors } from "../../actions/actions";
import { withRouter } from "react-router-dom";

let upcomingSlider = React.createRef();
let _mounted = false;

class Upcoming extends Component {
  componentDidMount = () => {
    _mounted = true;
    if (_mounted) {
      this.props.onUpcoming();
    }
  };

  componentWillUnmount() {
    _mounted = false;
  }

  handleClick = id => {
    this.props.onsingleMovie(id);
    this.props.onLoadTrailer(id);
    this.props.onLoadActors(id);
    this.props.history.push(`/movie/${id}`);
  };

  render() {
    return (
      <Swiper
        slider={upcomingSlider}
        movies={this.props.upcoming}
        handleClick={this.handleClick}
        category={"Upcoming"}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    upcoming: state.upcoming
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpcoming: () => dispatch(loadUpcoming()),
    onsingleMovie: id => dispatch(singleMovie(id)),
    onLoadTrailer: id => dispatch(loadTrailer(id)),
    onLoadActors: id => dispatch(loadActors(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Upcoming)
);
