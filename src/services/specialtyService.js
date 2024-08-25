import axios from "axios";

export const saveSpecialtyInfoService = (info) => {
  return axios.post(
    "http://localhost:8080/api/specialty/save-specialty-info",
    info
  );
};

export const getTopSpecialtyService = (limit) => {
  return axios.get(
    `http://localhost:8080/api/specialty/get-top-specialty/${limit}`
  );
};

export const getAllSpecialtyService = () => {
  return axios.get(`http://localhost:8080/api/specialty/get-all-specialty`);
};

export const getDetailSpecialtyService = (specialtyId) => {
  return axios.get(
    `http://localhost:8080/api/specialty/get-detail-specialty/${specialtyId}`
  );
};
