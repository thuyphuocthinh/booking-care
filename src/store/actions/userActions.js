import { getTopDoctorsService } from "../../services/doctorService";
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
