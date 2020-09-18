import { ActionTypes } from '../actions';

const initialState = {
  consistentFavs: [],
  deepCuts: [],
  onRepeat: [],
};

const ArtistsAnalysisReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CONSISTENT_FAVS_ARTISTS:
      return { ...state, consistentFavs: action.payload.artists };
    case ActionTypes.GET_DEEP_CUTS_ARTISTS:
      return { ...state, deepCuts: action.payload.artists };
    case ActionTypes.GET_ON_REPEAT_ARTISTS:
      return { ...state, onRepeat: action.payload.artists };
    default:
      return state;
  }
};

export default ArtistsAnalysisReducer;
