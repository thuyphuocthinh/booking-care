import axios from "axios";

export const getTopDoctorsService = (limit) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-top-doctors/${limit}`
  );
};
