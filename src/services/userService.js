import axios from "axios";

export const handleLoginService = async (username, password) => {
  return axios.post("http://localhost:8080/api/user/login", {
    username,
    password,
  });
};

export const getAllUsersService = async () => {
  return axios.get("http://localhost:8080/api/user/get-all-users");
};

export const addNewUserService = async (userInfo) => {
  return axios.post("http://localhost:8080/api/user/create-new-user", userInfo);
};
