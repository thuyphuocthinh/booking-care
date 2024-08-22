import actionTypes from "../actions/actionTypes";

const intialState = {
  userInfo: null,
  isLoggedIn: false,
  topDoctors: [],
  doctors: [],
};

const UserReducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        isLoggedIn: true,
      };

    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        userInfo: null,
        isLoggedIn: false,
      };

    case actionTypes.FETCH_TOP_DOCTORS:
      return {
        ...state,
        topDoctors: action.payload,
      };

    case actionTypes.FETCH_ALL_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
