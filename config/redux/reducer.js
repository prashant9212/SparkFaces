// reducer.js
import { ADD_TRACK_ID, REMOVE_TRACK_ID , SET_HMS_INSTANCE } from './actions';

const initialState = {
    hmsInstance: null,
  trackIds: [],
};

const trackReducer = (state = initialState, action) => {
    console.log('Reducer called', action.type)
  switch (action.type) {
    case SET_HMS_INSTANCE:
      return {
        ...state,
        hmsInstance: action.payload,
      };
    case ADD_TRACK_ID:
      return {
        ...state,
        trackIds: [action.payload],
      };
    case REMOVE_TRACK_ID:
      return {
        ...state,
        trackIds: state.trackIds.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

export default trackReducer;
