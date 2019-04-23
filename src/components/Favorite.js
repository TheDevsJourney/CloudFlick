import React from "react";
import { connect } from "react-redux";
import {
  saveFavorites,
  removeFavorites,
  toggleFavorite
} from "../actions/actions";

class Favorite extends React.Component {
  // Create isClicked in global state to keep track of it globally.
  state = {
    isClicked: false,
    color: "rgba(20,20,20,.8)"
  };

  render() {
    return (
      <div>
        <i
          style={{
            color: `${this.state.color}`,
            fontSize: "44px"
          }}
          className="fas fa-heart"
          id="movieHeart"
          onClick={() => {
            if (!this.state.isClicked) {
              this.props.onSaveFavorites(this.props.movie);
              this.setState({
                isClicked: true,
                color: "pink"
              });
              // this.props.onToggleFavorite(true, "pink");
            } else {
              this.props.onRemoveFavorites(this.props.movie);
              this.setState({
                isClicked: false,
                color: "rgba(50,50,50,.8)"
              });

              // this.props.onToggleFavorite(false, "blue");
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isClicked: state.isClicked,
    color: state.color
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveFavorites: (favorites, id) => dispatch(saveFavorites(favorites)),
    onRemoveFavorites: favorites => dispatch(removeFavorites(favorites)),
    onToggleFavorite: (isClicked, color) =>
      dispatch(toggleFavorite(isClicked, color))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorite);
