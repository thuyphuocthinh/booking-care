import axios from "axios";

export const saveBookingInfoService = (bookingInfo) => {
  return axios.post(
    "http://localhost:8080/api/booking/save-booking-info",
    bookingInfo
  );
};
