import axios from "axios";

export const bulkCreateNewScheduleService = (data) => {
  return axios.post(
    "http://localhost:8080/api/schedule/create-new-schedule",
    data
  );
};

export const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `http://localhost:8080/api/schedule/get-schedule-doctor-by-date/${doctorId}/${date}`
  );
};
