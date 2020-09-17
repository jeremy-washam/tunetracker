import Spotify from 'spotify-web-api-js';
import axios from 'axios';

export const ActionTypes = {
  FETCH_ARTISTS: 'FETCH_ARTISTS',
  FETCH_TRACKS: 'FETCH_TRACKS',
  FETCH_RECENT: 'FETCH_RECENT',
  FETCH_USERID: 'FETCH_USERID',
  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  CLEAR_PLAYLIST: 'CLEAR_PLAYLIST',
  SET_TRACK_TIMERANGE: 'SET_TRACK_TIMERANGE',
  SET_ARTIST_TIMERANGE: 'SET_ARTIST_TIMERANGE',
  SET_ORDER: 'SET_ORDER',
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

export function createPlaylist(token, userID, playlistName, uris) {
  return (dispatch) => {
    const spotifyAPI = new Spotify();
    spotifyAPI.setAccessToken(token);
    spotifyAPI.createPlaylist(userID, { name: playlistName }).then((response) => {
      spotifyAPI.addTracksToPlaylist(response.id, uris).then(() => {
        spotifyAPI.getPlaylist(response.id).then((data) => {
          console.log(data);
          dispatch({ type: ActionTypes.CREATE_PLAYLIST, payload: data });
        });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

/* Getting the URIs of artist top tracks was really difficult and this one is a doozy  */
export function createArtistPlaylist(token, userID, playlistName, artists) {
  return (dispatch) => {
    const SpotifyAPI = new Spotify();
    SpotifyAPI.setAccessToken(token);

    // Get artist IDs
    const ids = artists.map((artist) => {
      return (
        artist.id
      );
    });

    // Get spotify URIs based on artist IDs
    const uris = [];
    const length = ids.length > 20 ? 20 : ids.length;
    for (let index = 0; index < length; index += 1) {
      SpotifyAPI.getArtistTopTracks(ids[index], 'US').then((response) => {
        for (let index2 = 0; index2 < 5; index2 += 1) {
          uris.push(response.tracks[index2].uri);
        }
      });
    }

    // Create playlist like usual
    SpotifyAPI.createPlaylist(userID, { name: playlistName }).then((response) => {
      SpotifyAPI.addTracksToPlaylist(response.id, uris).then(() => {
        SpotifyAPI.getPlaylist(response.id).then((data) => {
          console.log(data);
          dispatch({ type: ActionTypes.CREATE_PLAYLIST, payload: data });
        });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    }).catch((error) => {
      dispatch({ type: ActionTypes.ERROR_SET, error });
    });
  };
}

export function clearPlaylist() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_PLAYLIST });
  };
}

export function setArtistTimerange(timerange) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_ARTIST_TIMERANGE, payload: timerange });
  };
}

export function setTrackTimerange(timerange) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_TRACK_TIMERANGE, payload: timerange });
  };
}

export function setRecentOrder(isChronological) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_ORDER, payload: isChronological });
  };
}
