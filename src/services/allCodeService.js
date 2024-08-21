import axios from "axios";

export const getAllCodeService = (type) => {
  return axios.get(`http://localhost:8080/api/allCode?type=${type}`);
};
