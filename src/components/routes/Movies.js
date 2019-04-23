import React from "react";
// import Favorite from "../Favorite";
import ViewMovie from "../ViewMovie";
import { connect } from "react-redux";
import {
  singleMovie,
  loadTrailer,
  loadActors,
  resetMovies
} from "../../actions/actions";
import { withRouter } from "react-router-dom";

function Movies(props) {
  return (
    <React.Fragment>
      {/* <Link to="/">Go Home</Link> */}
      {props.movies.length !== 0 && (
        <div className="moviesGrid">
          {props.movies.map(
            movie =>
              movie.poster_path && (
                <div key={movie.id} className="moviesGridItem">
                  <div
                    className="moviesGridImg"
                    onClick={() => {
                      props.onsingleMovie(movie.id);
                      props.onLoadTrailer(movie.id);
                      props.onLoadActors(movie.id);
                      props.onResetMovies();
                      props.history.push(`/movie/${movie.id}`);
                    }}
                  >
                    <img
                      src={
                        movie.poster_path &&
                        `http://image.tmdb.org/t/p/w185//${movie.poster_path}`
                      }
                      alt={movie.title}
                      style={{ height: "300px", minWidth: "250px" }}
                    />
                  </div>
                  <div className="moviesGridBottom">
                    <h3 style={{ marginBottom: "6px" }}>
                      {movie.title.length < 20
                        ? movie.title
                        : movie.title.substring(0, 20) + "..."}
                    </h3>
                    <ViewMovie movie={movie.id} />
                    {/* <Favorite movie={movie} id={movie.id} /> */}
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* if there are no movie results */}
      {props.movies.length === 0 && (
        <div
          style={{
            height: "92vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1>We Cannot Find Your Search. Please Try Another Film...</h1>
        </div>
      )}
    </React.Fragment>
  );
}
// let _mounted = false;
// class Movies extends Component {
//   state = {
//     load: false
//   };
//   componentDidMount() {
//     if (_mounted) {
//       this.setState({
//         load: true
//       });
//       setTimeout(() => {
//         this.setState({
//           load: false
//         });
//       }, 1000);
//     }
//   }
//   render() {
//     return (
//       <React.Fragment>
//         {/* <Link to="/">Go Home</Link> */}
//         {this.state.load && <Loader />}
//         {this.props.movies.length !== 0 && (
//           <div className="moviesGrid">
//             {this.props.movies.map(
//               movie =>
//                 movie.poster_path && (
//                   <div key={movie.id} className="moviesGridItem">
//                     <div
//                       className="moviesGridImg"
//                       onClick={() => {
//                         this.props.onsingleMovie(movie.id);
//                         this.props.onLoadTrailer(movie.id);
//                         this.props.onLoadActors(movie.id);
//                         this.props.onResetMovies();
//                         this.props.history.push(`/movie/${movie.id}`);
//                       }}
//                     >
//                       <img
//                         src={
//                           movie.poster_path &&
//                           `http://image.tmdb.org/t/p/w185//${movie.poster_path}`
//                         }
//                         alt={movie.title}
//                         style={{ height: "300px", minWidth: "250px" }}
//                       />
//                     </div>
//                     <div className="moviesGridBottom">
//                       <h3 style={{ marginBottom: "6px" }}>
//                         {movie.title.length < 20
//                           ? movie.title
//                           : movie.title.substring(0, 20) + "..."}
//                       </h3>
//                       <ViewMovie movie={movie.id} />
//                       {/* <Favorite movie={movie} id={movie.id} /> */}
//                     </div>
//                   </div>
//                 )
//             )}
//           </div>
//         )}

//         {/* if there are no movie results */}
//         {this.props.movies.length === 0 && (
//           <div
//             style={{
//               height: "92vh",
//               width: "100%",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center"
//             }}
//           >
//             <h1>We Cannot Find Your Search. Please Try Another Film...</h1>
//           </div>
//         )}
//       </React.Fragment>
//     );
//   }
// }

const mapStateToProps = state => {
  return {
    movies: state.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onsingleMovie: id => dispatch(singleMovie(id)),
    onLoadTrailer: id => dispatch(loadTrailer(id)),
    onLoadActors: id => dispatch(loadActors(id)),
    onResetMovies: () => dispatch(resetMovies())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Movies)
);
