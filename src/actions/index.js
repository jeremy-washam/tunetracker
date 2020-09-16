import Spotify from 'spotify-web-api-js';
import axios from 'axios';

export const ActionTypes = {
  FETCH_ARTISTS: 'FETCH_ARTISTS',
  FETCH_TRACKS: 'FETCH_TRACKS',
  FETCH_RECENT: 'FETCH_RECENT',
  FETCH_USERID: 'FETCH_USERID',
  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  GET_PLAYLIST: 'GET_PLAYLIST',
  ERROR_SET: 'ERROR_SET',
};

export function fetchArtists(token, range) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopArtists({ limit: 50, time_range: range })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchTracks(token, range) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopTracks({ limit: 50, time_range: range })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchRecentHistory(token) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyRecentlyPlayedTracks({ limit: 50 })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_RECENT, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/* The Spotify API library I used doesn't provide a function to fetch userID,
so I wrote this  to grab that to use in the other functions i.e. creating playlist */
export function fetchUserID(token) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      dispatch({ type: ActionTypes.FETCH_USERID, payload: response.data });
    })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/* Do I need to dispatch an action here? */
export function createPlaylist(token, userID, playlistName, uris) {
  return (dispatch) => {
    const spotifyAPI = new Spotify();
    spotifyAPI.setAccessToken(token);
    spotifyAPI.createPlaylist(userID, { name: playlistName }).then((response) => {
      spotifyAPI.addTracksToPlaylist(response.id, uris).then(() => {
        spotifyAPI.getPlaylist(response.id).then((data) => {
          dispatch({ type: ActionTypes.CREATE_PLAYLIST, payload: data.images[0].url });
        });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}
