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

export const getDetailDoctorService = (doctorId) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-detail-doctor/${doctorId}`
  );
};

export const updateDetailDoctorService = (doctorInfo) => {
  return axios.patch(
    "http://localhost:8080/api/doctors/update-detail-doctor",
    doctorInfo
  );
};
