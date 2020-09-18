import { ActionTypes } from '../actions';

const initialState = {
  items: [],
  isChronological: false,
};

const RecentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RECENT:
      return { ...state, items: action.payload.items };
    case ActionTypes.SET_RECENT_ORDER:
      return { ...state, isChronological: action.payload };
    default:
      return state;
  }
};

export default RecentReducer;
