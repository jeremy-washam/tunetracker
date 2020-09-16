import { ActionTypes } from '../actions';

const initialState = {
  id: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERID:
      return { id: action.payload.id };
    default:
      return state;
  }
};

export default UserReducer;
