import { ActionTypes } from '../actions';

const initialState = {
  longTerm: [],
  mediumTerm: [],
  shortTerm: [],
  artists: [],
  timerange: 'long_term',
  name: 'of All Time',
};

const ArtistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_LONGTERM_ARTISTS:
      return { ...state, longTerm: action.payload.items };
    case ActionTypes.FETCH_MEDIUMTERM_ARTISTS:
      return { ...state, mediumTerm: action.payload.items };
    case ActionTypes.FETCH_SHORTTERM_ARTISTS:
      return { ...state, shortTerm: action.payload.items };
    case ActionTypes.SET_ARTISTS_INFO:
      return {
        ...state,
        artists: action.payload.artists,
        timerange: action.payload.timerange,
        name: action.payload.name,
      };
    default:
      return state;
  }
};

export default ArtistsReducer;
