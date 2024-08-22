import {
  getAllDoctorsService,
  getTopDoctorsService,
} from "../../services/doctorService";
import actionTypes from "./actionTypes";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await getTopDoctorsService(10);
      if (resp.status === 200 && resp.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS,
          payload: resp.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      const resp = await getAllDoctorsService();
      if (resp.status === 200 && resp.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS,
          payload: resp.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
