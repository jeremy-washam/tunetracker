import { ActionTypes } from '../actions';

const initialState = {
  trackTimerange: 'long_term',
  artistTimerange: 'long_term',
  isChronological: false,
};

const FilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TRACK_TIMERANGE:
      return { ...state, trackTimerange: action.payload };
    case ActionTypes.SET_ARTIST_TIMERANGE:
      return { ...state, artistTimerange: action.payload };
    case ActionTypes.SET_ORDER:
      return { ...state, isChronological: action.payload };
    default:
      return state;
  }
};

export default FilterReducer;
