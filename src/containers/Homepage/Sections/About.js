import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="section section-about d-flex align-items-center">
        <div className="container">
          <div className="section-header">
            <h3>Truyền thông nói gì về chúng tôi</h3>
          </div>
          <div className="section-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/147SkAVXEqM?si=PPyxyGLtDk_zUcvk"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                BookingCare nỗ lực xây dựng Nền tảng Y tế chăm sóc sức khỏe toàn
                diện hàng đầu Việt Nam vươn tầm khu vực Asean, giúp bệnh nhân
                lựa chọn dịch vụ y tế phù hợp nhằm nâng cao hiệu quả chữa bệnh,
                tiết kiệm thời gian và chi phí.
              </p>
              <p>
                BookingCare là Nền tảng Y tế Chăm sóc sức khỏe toàn diện kết nối
                người dùng đến với dịch vụ y tế - chăm sóc sức khỏe chất lượng,
                hiệu quả và tin cậy. BookingCare kết nối mạng lưới bác sĩ giỏi ở
                nhiều bệnh viện, phòng khám khác nhau. Có thể hình dung,
                BookingCare hoạt động theo mô hình tương tự như Taxi Uber hay
                Grab trong lĩnh vực Y tế - Chăm sóc sức khỏe.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.user.isLoggedin,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
