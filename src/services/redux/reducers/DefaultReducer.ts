import { combineReducers } from "redux";

/**
 * Action types
 * All the actions defined here will be implemented in reducer,
 * this way it's easier to manage action type strings
 */
const SET_COUNTRY = "set_country";
const UPDATE_DATA = "update_data";

// initial state of the reducer
const INITIAL_STATE = {
  country: null,
  data: {},
};

// reducer
const defaultReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_COUNTRY:
      return { ...state, country: action.payload };
    case UPDATE_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  default: defaultReducer,
});

// reducer actions
export const setCountry = (country: string) => ({
  type: SET_COUNTRY,
  payload: country,
});
export const updateData = (data: any) => ({
  type: UPDATE_DATA,
  payload: data,
});
