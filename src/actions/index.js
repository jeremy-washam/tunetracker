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

export function setRecentOrder(isChronological) {
  return (dispatch) => {
    dispatch({ type: ActionTypes.SET_RECENT_ORDER, payload: isChronological });
  };
}

/* ************************************************* Playlist actions ************************************************* */

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

/* ************************************************* Tracks Analysis actions ************************************************* */
/* Citations:
  https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
  https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
  https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
  */
export function getConsistentFavsTracks(token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs) {
  // Find the IDs that show up in all time and at least one other time range
  const consistentFavorites1 = longTermIDs.filter((element) => mediumTermIDs.includes(element));
  const consistentFavorites2 = consistentFavorites1.concat(longTermIDs.filter((element) => shortTermIDs.includes(element)));
  const consistentFavorites3 = consistentFavorites2.concat(longTermIDs.filter((element) => recentIDs.includes(element)));

  // remove duplicates
  const consistentFavorites = consistentFavorites3.filter((item, pos) => {
    return consistentFavorites3.indexOf(item) === pos;
  });

  // then fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getTracks(consistentFavorites)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_CONSISTENT_FAVS_TRACKS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getDeepCutsTracks(token, longTermIDs, mediumTermIDs, shortTermIDs, recentIDs) {
  // Find the track IDs that show up in all time but no other time range
  const deepCuts1 = longTermIDs;
  const deepCuts2 = deepCuts1.filter((element) => !mediumTermIDs.includes(element));
  const deepCuts3 = deepCuts2.filter((element) => !shortTermIDs.includes(element));
  const deepCuts = deepCuts3.filter((element) => !recentIDs.includes(element));

  // then fetch the tracks from Spotify based on those IDs
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
  // Find the track IDs that show up in short term and in recently played
  const onRepeat = shortTermIDs.filter((element) => recentIDs.includes(element));

  // then fetch the tracks from Spotify based on those IDs
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
  https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
  https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
  https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
  */
export function getConsistentFavsArtists(token, longTermIDs, mediumTermIDs, shortTermIDs) {
  // Find the IDs that show up in all time and at least one other time range
  const consistentFavorites1 = longTermIDs.filter((element) => mediumTermIDs.includes(element));
  const consistentFavorites2 = consistentFavorites1.concat(longTermIDs.filter((element) => shortTermIDs.includes(element)));

  // remove duplicates
  const consistentFavorites = consistentFavorites2.filter((item, pos) => {
    return consistentFavorites2.indexOf(item) === pos;
  });

  // then fetch the tracks from Spotify based on those IDs
  const SpotifyAPI = new Spotify();
  SpotifyAPI.setAccessToken(token);
  return (dispatch) => {
    SpotifyAPI.getArtists(consistentFavorites)
      .then((data) => {
        dispatch({ type: ActionTypes.GET_CONSISTENT_FAVS_ARTISTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function getDeepCutsArtists(token, longTermIDs, mediumTermIDs, shortTermIDs) {
  // Find the track IDs that show up in all time but no other time range
  const deepCuts1 = longTermIDs;
  const deepCuts2 = deepCuts1.filter((element) => !mediumTermIDs.includes(element));
  const deepCuts = deepCuts2.filter((element) => !shortTermIDs.includes(element));

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
  // Find the track IDs that show up in short term and in recently played
  const onRepeat = mediumTermIDs.filter((element) => shortTermIDs.includes(element));

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
