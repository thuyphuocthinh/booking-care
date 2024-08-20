import React, { Component } from "react";
import { connect } from "react-redux";
import "./Doctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doctorImg from "../../../assets/images/doctor.png";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

class Doctor extends Component {
  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      slidesPerRow: 4,
      draggable: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="section doctor-section d-flex align-items-center">
        <div className="container">
          <div className="section-header">
            <h3>Bác sĩ nổi bật tuần qua</h3>
            <button> Xem thêm </button>
          </div>
          <div className="section-content">
            <Slider {...settings}>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={doctorImg} />
                  <h4>Giáo sư Nguyễn Văn A</h4>
                  <h5>Cơ xương khớp</h5>
                </div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
