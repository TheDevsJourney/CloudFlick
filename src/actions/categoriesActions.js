import axios from "axios";
const API_KEY = "4f1680ac15d9436d8d85069f2319d6a8";

// Gather API Results For Trending Movies
export const saveLoadTrending = trending => {
  return {
    type: "TRENDING",
    trending
  };
};

export const loadTrending = () => {
  return dispatch => {
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then(res => dispatch(saveLoadTrending(res.data.results)));
  };
};

// Gather API Results For Top Rated
export const saveLoadTopRated = topRated => {
  return {
    type: "TOP_RATED",
    topRated
  };
};

export const loadTopRated = () => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(res => dispatch(saveLoadTopRated(res.data.results)));
  };
};

// Gather API Results For Upcoming
export const saveLoadUpcoming = upcoming => {
  return {
    type: "UPCOMING",
    upcoming
  };
};

export const loadUpcoming = () => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(res => dispatch(saveLoadUpcoming(res.data.results)));
  };
};

// Gather API Results For Now Playing
export const saveLoadNowPlaying = nowPlaying => {
  return {
    type: "NOW_PLAYING",
    nowPlaying
  };
};

export const loadNowPlaying = () => {
  return dispatch => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      )
      .then(res => dispatch(saveLoadNowPlaying(res.data.results)));
  };
};
