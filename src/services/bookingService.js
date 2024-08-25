import axios from "axios";

export const saveBookingInfoService = (bookingInfo) => {
  return axios.post(
    "http://localhost:8080/api/booking/save-booking-info",
    bookingInfo
  );
};

export const verifyBookingService = (token, doctorId) => {
  return axios.get(
    `http://localhost:8080/api/booking/verify?token=${token}&doctorId=${doctorId}`
  );
};
