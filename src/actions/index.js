/* I used this spotify API library to make all of my API calls: https://github.com/JMPerez/spotify-web-api-js */
import Spotify from 'spotify-web-api-js';
import axios from 'axios';

export const ActionTypes = {
  // Artists actions
  FETCH_LONGTERM_ARTISTS: 'FETCH_LONGTERM_ARTISTS',
  FETCH_MEDIUMTERM_ARTISTS: 'FETCH_MEDIUMTERM_ARTISTS',
  FETCH_SHORTTERM_ARTISTS: 'FETCH_SHORTTERM_ARTISTS',
  SET_ARTISTS_INFO: 'SET_ARTISTS_INFO',
  // Tracks actions
  FETCH_SHORTTERM_TRACKS: 'FETCH_SHORTTERM_TRACKS',
  FETCH_MEDIUMTERM_TRACKS: 'FETCH_MEDIUMTERM_TRACKS',
  FETCH_LONGTERM_TRACKS: 'FETCH_LONGTERM_TRACKS',
  SET_TRACKS_INFO: 'SET_TRACKS_INFO',
  // Recent actions
  FETCH_RECENT: 'FETCH_RECENT',
  SET_RECENT_ORDER: 'SET_RECENT_ORDER',
  // Playlist actions
  FETCH_USERID: 'FETCH_USERID',
  CREATE_PLAYLIST: 'CREATE_PLAYLIST',
  CLEAR_PLAYLIST: 'CLEAR_PLAYLIST',
  // Tracks Analysis actions
  GET_CONSISTENT_FAVS_TRACKS: 'GET_CONSISTENT_FAVS_TRACKS',
  GET_DEEP_CUTS_TRACKS: 'GET_DEEP_CUTS_TRACKS',
  GET_ON_REPEAT_TRACKS: 'GET_ON_REPEAT_TRACKS',
  // Artists Analysis actions
  GET_CONSISTENT_FAVS_ARTISTS: 'GET_CONSISTENT_FAVS_ARTISTS',
  GET_DEEP_CUTS_ARTISTS: 'GET_DEEP_CUTS_ARTISTS',
  GET_ON_REPEAT_ARTISTS: 'GET_ON_REPEAT_ARTISTS',
  // Error
  ERROR_SET: 'ERROR_SET',
};

/* ************************************************* Top Artists actions ************************************************* */
export function fetchLongTermArtists(token) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopArtists({ limit: 50, time_range: 'long_term' })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_LONGTERM_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchMediumTermArtists(token) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopArtists({ limit: 30, time_range: 'medium_term' })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_MEDIUMTERM_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchShortTermArtists(token) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopArtists({ limit: 30, time_range: 'short_term' })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_SHORTTERM_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/* Used for creating the playlist and for keeping track of which tab/timerange the user is on */
export function setArtistsInfo(timerange, name, artists) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_ARTISTS_INFO, payload: { timerange, name, artists } });
  };
}

/* ************************************************* Top Tracks actions ************************************************* */
export function fetchLongTermTracks(token) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopTracks({ limit: 50, time_range: 'long_term' })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_LONGTERM_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchMediumTermTracks(token) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopTracks({ limit: 50, time_range: 'medium_term' })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_MEDIUMTERM_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchShortTermTracks(token) {
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getMyTopTracks({ limit: 50, time_range: 'short_term' })
      .then((data) => {
        dispatch({ type: ActionTypes.FETCH_SHORTTERM_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/* Used for creating the playlist and for keeping track of which tab/timerange the user is on */
export function setTracksInfo(timerange, name, tracks) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_TRACKS_INFO, payload: { timerange, name, tracks } });
  };
}

/* ************************************************* Recent Tracks actions ************************************************* */

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

/* Used for creating the playlist and for keeping track of which tab/timerange the user is on */
export function setRecentOrder(isChronological) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_RECENT_ORDER, payload: isChronological });
  };
}

/* ************************************************* Playlist actions ************************************************* */

/* The Spotify API library I used doesn't provide a function to fetch userID,
so used axios to grab that to use in the other functions (namely creating playlist) */
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

/* Create playlist, then add tracks, then return playlist info for the modal */
export function createPlaylist(token, userID, playlistName, uris) {
  return (dispatch) => {
    const spotifyAPI = new Spotify();
    spotifyAPI.setAccessToken(token);
    spotifyAPI.createPlaylist(userID, { name: playlistName }).then((response) => {
      spotifyAPI.addTracksToPlaylist(response.id, uris).then(() => {
        spotifyAPI.getPlaylist(response.id).then((data) => {
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

/* Get IDs of the top 20 artists, get the top 5 tracks for each, add those to the playlist, and return playlist info */
export function createArtistPlaylist(token, userID, playlistName, artists) {
  return (dispatch) => {
    const SpotifyAPI = new Spotify();
    SpotifyAPI.setAccessToken(token);

    console.log(artists.length);

    const length = artists.length > 20 ? 20 : artists.length;
    const tracksPromises = artists.slice(0, length).map((artist) => {
      return (
        SpotifyAPI.getArtistTopTracks(artist.id, 'US')
      );
    });

    const uris = [];
    Promise.all(tracksPromises).then((response) => {
      for (let index = 0; index < length; index += 1) {
        for (let index2 = 0; index2 < 5; index2 += 1) {
          uris.push(response[index].tracks[index2].uri);
        }
      }
    }).then(() => {
      SpotifyAPI.createPlaylist(userID, { name: playlistName }).then((response) => {
        SpotifyAPI.addTracksToPlaylist(response.id, uris).then(() => {
          SpotifyAPI.getPlaylist(response.id).then((data) => {
            dispatch({ type: ActionTypes.CREATE_PLAYLIST, payload: data });
          });
        }).catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
        });
      }).catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
    });
  };
}

/* Clear playlist info when you close the modal */
export function clearPlaylist() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.CLEAR_PLAYLIST });
  };
}

/* ************************************************* Tracks Analysis actions ************************************************* */
/* Citations:
  set operations: https://2ality.com/2015/01/es6-set-operations.html
  convert set to array: https://www.geeksforgeeks.org/how-to-convert-set-to-array-in-javascript/
  */

export function getConsistentFavsTracks(token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs) {
  // what ids show up in all time and one other category?
  const intersection1 = new Set(
    [...longTermIDs].filter((id) => mediumTermIDs.has(id)),
  );
  const intersection2 = new Set(
    [...longTermIDs].filter((id) => shortTermIDs.has(id)),
  );
  const intersection3 = new Set(
    [...longTermIDs].filter((id) => recentIDs.has(id)),
  );
  const union = new Set([...intersection1, ...intersection2, ...intersection3]);

  const consistentFavs = [...union];

  // fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getTracks(consistentFavs)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_CONSISTENT_FAVS_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getDeepCutsTracks(token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs) {
  // What ids show up in all time but no other categories?
  const difference1 = new Set(
    [...longTermIDs].filter((id) => !mediumTermIDs.has(id)),
  );
  const difference2 = new Set(
    [...difference1].filter((id) => !shortTermIDs.has(id)),
  );
  const difference = new Set(
    [...difference2].filter((id) => !recentIDs.has(id)),
  );

  const deepCuts = [...difference];

  // fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getTracks(deepCuts)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_DEEP_CUTS_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getOnRepeatTracks(token, shortTermIDs, recentIDs) {
  // what ids show up in short term and recently played?
  const intersection = new Set(
    [...shortTermIDs].filter((id) => recentIDs.has(id)),
  );

  const onRepeat = [...intersection];

  // fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getTracks(onRepeat)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_ON_REPEAT_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

/* ************************************************* Artists Analysis actions ************************************************* */
/* Citations:
  set operations: https://2ality.com/2015/01/es6-set-operations.html
  convert set to array: https://www.geeksforgeeks.org/how-to-convert-set-to-array-in-javascript/
  */
export function getConsistentFavsArtists(token, longTermIDs, mediumTermIDs, shortTermIDs) {
  // What ids show up in all time and one other category?
  const intersection1 = new Set(
    [...longTermIDs].filter((id) => mediumTermIDs.has(id)),
  );
  const intersection2 = new Set(
    [...longTermIDs].filter((id) => shortTermIDs.has(id)),
  );

  const union = new Set([...intersection1, ...intersection2]);

  const consistentFavs = [...union];

  // then fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getArtists(consistentFavs)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_CONSISTENT_FAVS_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getDeepCutsArtists(token, longTermIDs, mediumTermIDs, shortTermIDs) {
  // What ids show up in all time but no other categories?
  const difference1 = new Set(
    [...longTermIDs].filter((id) => !mediumTermIDs.has(id)),
  );
  const difference2 = new Set(
    [...difference1].filter((id) => !shortTermIDs.has(id)),
  );

  const deepCuts = [...difference2];

  // then fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getArtists(deepCuts)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_DEEP_CUTS_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getOnRepeatArtists(token, mediumTermIDs, shortTermIDs) {
  // What ids show up in short term and recently played?
  const intersection = new Set(
    [...mediumTermIDs].filter((id) => shortTermIDs.has(id)),
  );

  const onRepeat = [...intersection];

  // then fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getArtists(onRepeat)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_ON_REPEAT_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}
