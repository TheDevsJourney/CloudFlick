import axios from "axios";

export const onSearch = search => {
  return {
    type: "SEARCH",
    search
  };
};

export const saveFavorites = favorites => {
  return {
    type: "SAVE_FAVORITES",
    favorites
  };
};

export const toggleFavorite = (isClicked, color) => {
  return {
    type: "TOGGLE_FAVORITE",
    isClicked,
    color
  };
};

export const removeFavorites = favorites => {
  return {
    type: "REMOVE_FAVORITES",
    favorites
  };
};

const API_KEY = "4f1680ac15d9436d8d85069f2319d6a8";
// Gather API response for Movies and set state.
export const saveMovieData = movies => {
  return {
    type: "MOVIE_DATA",
    movies
  };
};

export const movieData = movies => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movies}`
      )
      .then(res => dispatch(saveMovieData(res.data.results)));
  };
};

// Gather API result for single movie and set state.
export const saveSingleMovie = movie => {
  return {
    type: "SINGLE_MOVIE",
    movie
  };
};

export const singleMovie = id => {
  return dispatch => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(results => dispatch(saveSingleMovie(results.data)));
  };
};

// Gather API Result for Current Video To Show Trailer
export const saveLoadTrailer = trailer => {
  return {
    type: "WATCH_TRAILER",
    trailer
  };
};

export const loadTrailer = id => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US
    `
      )
      .then(results => dispatch(saveLoadTrailer(results.data.results)));
  };
};

// Gather Results for the actors of a movie
export const saveLoadActors = actors => {
  return {
    type: "SAVE_ACTORS",
    actors
  };
};

export const loadActors = id => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      )
      .then(results => dispatch(saveLoadActors(results.data.cast)));
  };
};

// Results for Single Actor
export const saveLoadPerson = person => {
  return {
    type: "SAVE_PERSON",
    person
  };
};

export const loadPerson = id => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US
    `
      )
      .then(results => dispatch(saveLoadPerson(results.data)));
    // axios.all([
    //   axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US
    //   // `),
    //   axios.get(`https://api.themoviedb.org/3/find/${id}?api_key=${API_KEY}&language=en-US&external_source=imdb_id
    //   `)
    // ])
  };
};

// Get IMDB Data for actor
export const saveLoadActorIMDB = personIMDB => {
  return {
    type: "SAVE_ACTOR_IMDB",
    personIMDB
  };
};

export const loadActorIMDB = id => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/find/${id}?api_key=${API_KEY}&language=en-US&external_source=imdb_id
    `
      )
      .then(results =>
        dispatch(saveLoadActorIMDB(results.data.person_results))
      );
  };
};

// Reset state when leaving routes
export const resetMovie = () => {
  return {
    type: "RESET_MOVIE"
  };
};

export const resetMovies = () => {
  return {
    type: "RESET_MOVIES"
  };
};

export const resetPersonIMDB = () => {
  return {
    type: "RESET_PERSONIMDB"
  };
};
