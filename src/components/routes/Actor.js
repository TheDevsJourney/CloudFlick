import React, { Component } from "react";
import { connect } from "react-redux";
import { loadActorIMDB, resetMovie } from "../../actions/actions";
import Loader from "../Loader";
import { Link, withRouter } from "react-router-dom";
import ViewMovie from "../ViewMovie";
let error;
let _mounted = false;
let year = new Date().getFullYear();

class Actor extends Component {
  _mounted = false;
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
        if (this.props.person) {
          this.props.onLoadActorIMDB(this.props.person.imdb_id);
        } else {
          error = "Sorry We Can't Find This...";
        }
      }, 500);
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
                {this.props.person.birthday && (
                  <p style={{ color: "rgba(225,225,225,0.3)" }}>
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
          <div style={{ width: "80%", margin: "50px auto" }}>
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
                        {/* Make sure media type is movie */}

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
                          <p style={{ margin: "5px 0 14px 0" }}>
                            {works.overview && works.overview}
                          </p>
                          <ViewMovie movie={works.id} />
                        </div>
                      </div>
                    )
                )}
              </React.Fragment>
            )}
          </div>
        ))}

        {error && <p>{error}</p>}
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
    onResetMovie: () => dispatch(resetMovie())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Actor)
);
