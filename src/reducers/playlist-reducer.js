import { ActionTypes } from '../actions';

const initialState = {
  url: {},
};

const PlaylistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_PLAYLIST:
      return { url: action.payload };
    default:
      return state;
  }
};

export default PlaylistReducer;
