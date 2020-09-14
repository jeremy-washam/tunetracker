import { ActionTypes } from '../actions';

const initialState = {
  items: [],
};

const RecentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RECENT:
      return { items: action.payload.items };
    default:
      return state;
  }
};

export default RecentReducer;
