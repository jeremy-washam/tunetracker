import { ActionTypes } from '../actions';

const initialState = {
  items: [],
};

const ArtistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_ARTISTS:
      return { items: action.payload.items };
    default:
      return state;
  }
};

export default ArtistsReducer;
