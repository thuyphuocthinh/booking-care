import axios from "axios";

export const getTopDoctorsService = (limit) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-top-doctors/${limit}`
  );
};

export const getAllDoctorsService = () => {
  return axios.get(`http://localhost:8080/api/doctors/get-all-doctors`);
};

export const saveDoctorInfo = (doctorInfo) => {
  return axios.post(
    "http://localhost:8080/api/doctors/save-info-doctor",
    doctorInfo
  );
};
