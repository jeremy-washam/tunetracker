import { ActionTypes } from '../actions';

const initialState = {
  image: {},
  link: {},
};

const PlaylistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_PLAYLIST:
      return { image: action.payload.images[0].url, link: action.payload.external_urls.spotify };
    case ActionTypes.CLEAR_PLAYLIST:
      return { image: {}, link: {} };
    default:
      return state;
  }
};

export default PlaylistReducer;
