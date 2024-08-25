import axios from "axios";

export const saveClinicInfoService = (info) => {
  return axios.post("http://localhost:8080/api/clinic/save-clinic-info", info);
};

export const getAllClinicService = () => {
  return axios.get("http://localhost:8080/api/clinic/get-all-clinic");
};

export const getDetailClinicService = (id) => {
  return axios.get(`http://localhost:8080/api/clinic/get-detail-clinic/${id}`);
};
