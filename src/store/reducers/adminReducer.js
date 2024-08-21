import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  adminInfo: null,
  genders: [],
  roles: [],
  positions: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        adminInfo: action.adminInfo,
      };
    case actionTypes.ADMIN_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        adminInfo: null,
      };
    case actionTypes.FETCH_GENDER_START:
      return { ...state };
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.payload,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      return { ...state };
    case actionTypes.GET_ROLE_ACTION:
      console.log("ROLE: ", action.payload);
      return {
        ...state,
        roles: action.payload,
      };
    case actionTypes.GET_POSITION_ACTION:
      console.log("POSITION: ", action.payload);
      return {
        ...state,
        positions: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
