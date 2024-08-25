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

export const getExtraInfoDoctorService = (doctorId) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-extra-info-doctor/${doctorId}`
  );
};

export const getProfileDoctorService = (doctorId) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-profile-doctor/${doctorId}`
  );
};

export const getDoctorIdsBySpecialtyService = (specialtyId) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-doctorIds-by-specialty/${specialtyId}`
  );
};

export const getDoctorIdsByProvinceService = (provinceId, specialtyId) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-doctorIds-by-province/${provinceId}/${specialtyId}`
  );
};

export const getDoctorIdsByClinicService = (clinicId) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-doctorIds-by-clinic/${clinicId}`
  );
};

export const getListPatientsService = (doctorId, date) => {
  return axios.get(
    `http://localhost:8080/api/doctors/get-list-patients/${doctorId}/${date}`
  );
};
