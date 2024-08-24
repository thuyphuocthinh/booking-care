import { getAllCodeService } from "../../services/allCodeService";
import {
  deleteUser,
  getAllUsersService,
  getUserById,
} from "../../services/userService";
import actionTypes from "./actionTypes";

export const adminLoginSuccess = (adminInfo) => ({
  type: actionTypes.ADMIN_LOGIN_SUCCESS,
  adminInfo: adminInfo,
});

export const adminLoginFail = () => ({
  type: actionTypes.ADMIN_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo,
});

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("GENDER");
      if (res && res.data.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchGenderSuccess = (data) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  payload: data,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const getRolesAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("ROLE");
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.GET_ROLE_ACTION,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPositionAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("POSITION");
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.GET_POSITION_ACTION,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsersAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllUsersService();
      if (res.status === 200 && res) {
        dispatch({
          type: actionTypes.GET_ALL_USERS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveUserAction = () => {
  return async (dispatch, getState) => {
    try {
      // do some thing here but do not need
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCurrentUserAction = (userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await getUserById(userId);
      if (res && res.status === 200) {
        dispatch({
          type: actionTypes.GET_CURRENT_USER,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserAction = (userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await deleteUser(userId);
      if (res && res.data.errCode === 0) {
        const result = await getAllUsersService();
        if (result && result.status === 200)
          dispatch({
            type: actionTypes.GET_ALL_USERS,
            payload: result.data.data,
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchScheduleAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("TIME");
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE,
          payload: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPricesAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("PRICE");
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PRICE_ACTION,
          payload: res.data.data,
        });
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchPaymentsAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("PAYMENT");
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PAYMENT_ACTION,
          payload: res.data.data,
        });
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};

export const fetchProvincesAction = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCodeService("PROVINCE");
      if (res && res.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PROVINCE_ACTION,
          payload: res.data.data,
        });
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};
