// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import ArtistsReducer from './artists-reducer';
import TracksReducer from './tracks-reducer';
import RecentReducer from './recent-reducer';
import UserReducer from './user-reducer';
import PlaylistReducer from './playlist-reducer';

const rootReducer = combineReducers({
  artists: ArtistsReducer,
  tracks: TracksReducer,
  recent: RecentReducer,
  user: UserReducer,
  playlist: PlaylistReducer,
});

export default rootReducer;
