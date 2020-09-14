import { ActionTypes } from '../actions';

const initialState = {
  items: [],
};

const TracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TRACKS:
      return { items: action.payload.items };
    default:
      return state;
  }
};

export default TracksReducer;
