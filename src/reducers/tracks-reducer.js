import { ActionTypes } from '../actions';

const initialState = {
  longTerm: [],
  mediumTerm: [],
  shortTerm: [],
  tracks: [],
  timerange: 'long_term',
  name: 'of All Time',
};

const TracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LONGTERM_TRACKS:
      return { ...state, longTerm: action.payload.items };
    case ActionTypes.FETCH_MEDIUMTERM_TRACKS:
      return { ...state, mediumTerm: action.payload.items };
    case ActionTypes.FETCH_SHORTTERM_TRACKS:
      return { ...state, shortTerm: action.payload.items };
    case ActionTypes.SET_TRACKS_INFO:
      return {
        ...state,
        tracks: action.payload.tracks,
        timerange: action.payload.timerange,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export default TracksReducer;
