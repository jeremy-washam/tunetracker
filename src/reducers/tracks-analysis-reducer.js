import { ActionTypes } from '../actions';

const initialState = {
  consistentFavs: [],
  deepCuts: [],
  onRepeat: [],
};

const TracksAnalysisReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CONSISTENT_FAVS_TRACKS:
      return { ...state, consistentFavs: action.payload.tracks };
    case ActionTypes.GET_DEEP_CUTS_TRACKS:
      return { ...state, deepCuts: action.payload.tracks };
    case ActionTypes.GET_ON_REPEAT_TRACKS:
      return { ...state, onRepeat: action.payload.tracks };
    default:
      return state;
  }
};

export default TracksAnalysisReducer;
