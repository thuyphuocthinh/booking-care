import actionTypes from "../actions/actionTypes";

const intialState = {
  userInfo: null,
  isLoggedIn: false,
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

    default:
      return state;
  }
};

export default UserReducer;
