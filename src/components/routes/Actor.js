import React, { Component } from "react";
import { connect } from "react-redux";
import { loadActorIMDB, resetMovie, singleMovie } from "../../actions/actions";
import Loader from "../Loader";
import { Link, withRouter } from "react-router-dom";
import ViewMovie from "../ViewMovie";

let _mounted = false;
let year = new Date().getFullYear();

class Actor extends Component {
  _mounted = false;
  state = {
    load: false,
    error: ""
  };
  componentDidMount() {
    _mounted = true;
    if (_mounted) {
      this.setState({
        load: true
      });
      setTimeout(() => {
        if (this.props.person.imdb_id !== "") {
          this.setState({
            error: ""
          });
          this.props.onLoadActorIMDB(this.props.person.imdb_id);
        } else {
          this.setState({
            error: "Sorry We Can't Find This..."
          });
        }
      }, 1100);
      setTimeout(() => {
        this.setState({
          load: false
        });
      }, 1200);
    }
  }

  componentWillUnmount() {
    _mounted = false;
  }

  render() {
    return (
      <React.Fragment>
        {this.props.personIMDB.map(personIMDB => (
          <div className="movie_backdrop__container" key={personIMDB.id}>
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
            </div>

            {/* Person Details */}
            <div
              style={{
                position: "absolute",
                bottom: "100px",
                left: "10%",
                width: "80%",
                display: "flex",
                color: "white"
              }}
            >
              <div
                style={{
                  height: "180px",
                  width: "130px",
                  backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${
                    personIMDB.profile_path
                  }")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "4px"
                }}
              />

              <div
                style={{
                  marginLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "left"
                }}
              >
                <h2>{personIMDB.name}</h2>
                <div
                  style={{ color: "rgba(225,225,225,0.8)", margin: "3px 0" }}
                >
                  {this.props.person.gender === 1 && <p>Female | Actress</p>}
                  {this.props.person.gender === 2 && <p>Male | Actor</p>}
                </div>
                {this.props.person.birthday && !this.props.person.deathday && (
                  <p style={{ color: "rgba(225,225,225,0.5)" }}>
                    {`${year -
                      parseInt(
                        this.props.person.birthday.slice(0, 4)
                      )} years old`}
                  </p>
                )}
              </div>
            </div>

            {/* Back Arrow, reset movies state to default */}
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
          </div>
        ))}

        {this.props.personIMDB.map(personIMDB => (
          <div
            style={{ width: "80%", margin: "50px auto" }}
            key={personIMDB.id}
          >
            {this.props.person.biography && (
              <div style={{ marginBottom: "55px" }}>
                <h2
                  style={{
                    marginBottom: "20px",
                    color: "#18181e",
                    fontSize: "1.8rem"
                  }}
                >
                  Biography
                </h2>
                <p>{this.props.person.biography}</p>
              </div>
            )}
            {personIMDB.known_for.length !== 0 && (
              <React.Fragment>
                {/* Store media types in an array, if that array has no movies, do not display h2 */}

                <h2
                  style={{
                    marginTop: "55px",
                    marginBottom: "20px",
                    color: "#18181e",
                    fontSize: "1.8rem"
                  }}
                >
                  Popular Roles
                </h2>

                {personIMDB.known_for.map(
                  works =>
                    works.media_type === "movie" && (
                      <div
                        style={{
                          padding: "25px 0",
                          display: "flex",
                          alignItems: "center"
                        }}
                        key={works.id}
                      >
                        <div
                          style={{
                            height: "180px",
                            width: "130px",
                            backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${
                              works.poster_path
                            }")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "4px"
                          }}
                        />

                        <div
                          style={{
                            width: "70%",
                            padding: "0 20px",
                            marginLeft: "20px"
                          }}
                        >
                          <h2 style={{ color: "#18181e", fontSize: "1.5rem" }}>
                            {works.title ? works.title : works.name}
                          </h2>
                          {works.overview && (
                            <div style={{ margin: "5px 0 14px 0" }}>
                              {works.overview.length < 140 && (
                                <p>{works.overview}</p>
                              )}
                              {works.overview.length > 140 && (
                                <div>
                                  <p>
                                    {works.overview.substring(0, 140) + "..."}{" "}
                                  </p>

                                  <span
                                    style={{
                                      color: "#18181e",
                                      cursor: "pointer"
                                    }}
                                    onClick={() => {
                                      this.props.onsingleMovie(works.id);
                                      this.props.history.push(
                                        `/movie/${works.id}`
                                      );
                                    }}
                                  >
                                    Read More
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          <ViewMovie movie={works.id} />
                        </div>
                      </div>
                    )
                )}
              </React.Fragment>
            )}
          </div>
        ))}

        {this.state.error && (
          <div
            style={{
              height: "92vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h2>{this.state.error}</h2>
          </div>
        )}
        {this.state.load && <Loader />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    person: state.person,
    personIMDB: state.personIMDB,
    movie: state.movie
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadActorIMDB: id => dispatch(loadActorIMDB(id)),
    onResetMovie: () => dispatch(resetMovie()),
    onsingleMovie: id => dispatch(singleMovie(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Actor)
);
