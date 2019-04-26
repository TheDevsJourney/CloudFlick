import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Swiper from "../categories/Swiper";
import Loader from "../Loader";
import { loadPerson, loadActorIMDB, resetMovie } from "../../actions/actions";

const movie_trailer__iframe = React.createRef();
const closePlay = React.createRef();
const youtubePlay = React.createRef();
let actorSlider = React.createRef();
let _mounted = false;

class Movie extends Component {
  state = {
    load: false
  };
  componentDidMount() {
    _mounted = true;
    if (_mounted) {
      this.setState({
        load: true
      });
      setTimeout(() => {
        this.setState({
          load: false
        });
      }, 700);
    }
  }

  componentWillUnmount() {
    _mounted = false;
  }

  render() {
    const key = this.props.trailer.map(trailer => trailer.key);
    const tagLine = this.props.movie.tagline;
    const youtubeSrc = `https://www.youtube.com/embed/${key}?&autoplay=1`;

    const handleClick = id => {
      this.props.onLoadPerson(id);
      this.props.history.push(`/actor`);
    };

    return (
      <React.Fragment>
        {this.state.load && <Loader />}
        {this.props.movie.title && (
          <React.Fragment>
            <div className="movie_backdrop__container">
              <div
                className="movie_backdrop"
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${
                    this.props.movie.backdrop_path
                      ? this.props.movie.backdrop_path
                      : this.props.movie.poster_path
                  }")`
                }}
              >
                <div className="movie_backdrop__tint" />
                <div
                  className="movie_info"
                  style={{
                    position: "absolute",
                    bottom: "100px",
                    color: "white",
                    width: "80%",
                    left: "10%",
                    zIndex: "0",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <h2>{this.props.movie.title}</h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row"
                    }}
                  >
                    {this.props.movie.genres.map((genre, id) => (
                      <p
                        style={{
                          marginRight: "6px",
                          marginTop: "7px",
                          color: "rgba(225,225,225,0.5)",
                          fontSize: "1rem"
                        }}
                        key={id}
                      >
                        {id !== this.props.movie.genres.length - 1
                          ? `${genre.name} |`
                          : `${genre.name}`}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {tagLine && <h5 className="tagline">"{tagLine}"</h5>}

              <Link
                to="/"
                style={{
                  position: "absolute",
                  top: "50px",
                  width: "80%",
                  left: "10%"
                }}
              >
                <i
                  className="fas fa-chevron-left"
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "50%",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "2.4rem",
                    zIndex: "0"
                  }}
                  // onClick={props.history.goBack}
                  onClick={() => this.props.onResetMovie()}
                />
              </Link>

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                {this.props.trailer.map(
                  trailer =>
                    trailer.key && (
                      <iframe
                        title={this.props.movie.title}
                        src={" "}
                        width="560"
                        height="315"
                        frameBorder="0"
                        allow="autoplay"
                        allowFullScreen="allowfullscreen"
                        key={trailer.id}
                        ref={movie_trailer__iframe}
                        style={{
                          position: "relative",
                          zIndex: "100"
                        }}
                      />
                    )
                )}
                <p
                  style={{
                    position: "absolute",
                    top: "-50px",
                    left: "0%",
                    fontSize: "2rem",
                    color: "white",
                    cursor: "pointer",
                    backgroundColor: "#18181e",
                    width: "50px",
                    height: "50px",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  className="hidePlay"
                  ref={closePlay}
                  onClick={() => {
                    movie_trailer__iframe.current.setAttribute("src", " ");
                    closePlay.current.classList.remove("showPlay");
                    youtubePlay.current.classList.remove("hidePlay");
                  }}
                >
                  X
                </p>
              </div>
              {this.props.trailer.length !== 0 && (
                <i
                  className="fab fa-youtube"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: "3.2rem",
                    cursor: "pointer"
                  }}
                  ref={youtubePlay}
                  onClick={() => {
                    movie_trailer__iframe.current.setAttribute(
                      "src",
                      youtubeSrc
                    );
                    youtubePlay.current.classList.add("hidePlay");
                    closePlay.current.classList.add("showPlay");
                  }}
                />
              )}
            </div>
          </React.Fragment>
        )}

        {this.props.movie.title && (
          <React.Fragment>
            <div style={{ width: "80%", margin: "0 auto" }}>
              {this.props.movie.overview && (
                <h2
                  style={{
                    marginTop: "55px",
                    marginBottom: "20px",
                    color: "#18181e",
                    fontSize: "1.8rem"
                  }}
                >
                  Summary
                </h2>
              )}

              <p style={{ margin: "20px 0 50px 0" }}>
                {this.props.movie.overview}
              </p>
            </div>
            {this.props.actors.map(
              (actor, id) =>
                id === 0 &&
                (actor.profile_path && (
                  <Swiper
                    key={id}
                    slider={actorSlider}
                    movies={this.props.actors}
                    handleClick={handleClick}
                    category={"Actors"}
                  />
                ))
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movie,
    trailer: state.trailer,
    actors: state.actors,
    person: state.person
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPerson: id => dispatch(loadPerson(id)),
    onLoadActorIMDB: id => dispatch(loadActorIMDB(id)),
    onResetMovie: () => dispatch(resetMovie())
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Movie)
);
