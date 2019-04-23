const initState = {
  search: "",
  movies: [],
  movie: [],
  trailer: [],
  favorites: [],
  trending: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  actors: [],
  person: [],
  personIMDB: []
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        search: action.search
      };
    case "MOVIE_DATA":
      return {
        ...state,
        movies: action.movies.splice(0, 15)
      };
    case "SINGLE_MOVIE":
      return {
        ...state,
        movie: action.movie
      };
    case "WATCH_TRAILER":
      return {
        ...state,
        trailer: action.trailer.splice(0, 1)
      };
    case "SAVE_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.concat(action.favorites)
      };
    case "REMOVE_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => favorite !== action.favorites
        )
      };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        isClicked: action.isClicked,
        color: action.color
      };
    case "TRENDING":
      return {
        ...state,
        trending: action.trending.splice(0, 20)
      };
    case "TOP_RATED":
      return {
        ...state,
        topRated: action.topRated.splice(0, 20)
      };
    case "UPCOMING":
      return {
        ...state,
        upcoming: action.upcoming.splice(0, 20)
      };
    case "NOW_PLAYING":
      return {
        ...state,
        nowPlaying: action.nowPlaying.splice(0, 20)
      };
    case "SAVE_ACTORS":
      return {
        ...state,
        actors: action.actors
      };
    case "SAVE_PERSON":
      return {
        ...state,
        person: action.person
      };
    case "SAVE_ACTOR_IMDB":
      return {
        ...state,
        personIMDB: action.personIMDB
      };
    case "RESET_MOVIE":
      return {
        ...state,
        movie: []
      };
    case "RESET_MOVIES":
      return {
        ...state,
        movies: []
      };
    case "RESET_PERSONIMDB":
      return {
        ...state,
        personIMDB: []
      };
    default:
      return state;
  }
};

export default rootReducer;
