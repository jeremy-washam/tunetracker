/* eslint-disable quote-props */
/* eslint-disable no-useless-concat */
/* eslint-disable max-len */
import Spotify from 'spotify-web-api-js';

export const ActionTypes = {
  FETCH_ARTISTS: 'FETCH_ARTISTS',
  FETCH_TRACKS: 'FETCH_TRACKS',
  FETCH_RECENT: 'FETCH_RECENT',
  ERROR_SET: 'ERROR_SET',
};

export function fetchArtists(token, range) {
  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(token);
  return (dispatch) => {
    spotifyApi.getMyTopArtists({ limit: 30, time_range: range })
      .then((data) => {
        console.log('Artists:', data);
        dispatch({ type: ActionTypes.FETCH_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchTracks(token, range) {
  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(token);
  return (dispatch) => {
    spotifyApi.getMyTopTracks({ limit: 50, time_range: range })
      .then((data) => {
        console.log('Tracks:', data);
        dispatch({ type: ActionTypes.FETCH_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchRecentHistory(token) {
  const spotifyApi = new Spotify();
  spotifyApi.setAccessToken(token);
  return (dispatch) => {
    spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 })
      .then((data) => {
        console.log('Tracks:', data);
        dispatch({ type: ActionTypes.FETCH_RECENT, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/*
export function fetchLongTermArtists() {
  // ActionCreator returns a function
  // that gets called with dispatch
  // remember (arg) => { } is a function
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
      .then((response) => {
        // once we are done fetching we can dispatch a redux action with the response data
        dispatch({ type: ActionTypes.FETCH_ARTISTS, payload: response.data });
      })
      .catch((error) => {
        // whaaat?
        // dispatch an error, use it in a separate error reducer. this is the beauty of redux.
        // have an error component somewhere show it
        dispatch({ type: ActionTypes.ERROR_SET, error });
        // might you also want an ERROR_CLEAR action?
      });
  };
}
*/
