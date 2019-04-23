import React, { Component } from "react";
import { connect } from "react-redux";
import {
  onSearch,
  movieData,
  resetMovie,
  resetPersonIMDB
} from "../actions/actions";
import { withRouter } from "react-router-dom";
import Loader from "./Loader";

const headerSearch = React.createRef();
const headerIcon = React.createRef();

class Search extends Component {
  state = {
    input: "",
    setInput: "",
    load: false
  };
  render() {
    return (
      <React.Fragment>
        <form
          className="header-form"
          onSubmit={e => {
            e.preventDefault();
            if (this.state.input) {
              this.setState({
                load: true
              });
              this.props.handleSearch(this.state.input);
              this.props.onSaveMovieData(this.state.input);
              this.props.onResetMovie();
              this.props.onResetPersonIMDB();
              setTimeout(() => {
                this.setState({
                  load: false
                });
              }, 700);
              this.setState({
                input: ""
              });
              this.props.history.push(`/movies/${this.state.input}`);
              headerSearch.current.classList.remove("header-search__active");
            }
          }}
        >
          <input
            type="text"
            name="input"
            placeholder="Search Movies..."
            value={this.state.input}
            onChange={e => {
              this.setState({
                input: e.target.value
              });
            }}
            className="header-search"
            ref={headerSearch}
          />
          <div
            className="header-icon"
            ref={headerIcon}
            onClick={() => {
              headerSearch.current.classList.toggle("header-search__active");
              headerSearch.current.focus();
            }}
          >
            <i className="fas fa-search" />
          </div>
        </form>

        {this.state.load && <Loader />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearch: search => dispatch(onSearch(search)),
    onSaveMovieData: search => dispatch(movieData(search)),
    onResetMovie: () => dispatch(resetMovie()),
    onResetPersonIMDB: () => dispatch(resetPersonIMDB())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
