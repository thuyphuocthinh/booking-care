import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/images/specialty.jpg";

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

class Specialty extends Component {
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
      <div className="section-specialty d-flex align-items-center">
        <div className="container">
          <div className="specialty-header">
            <h3>Chuyên khoa phổ biến</h3>
            <button> Xem thêm </button>
          </div>
          <div className="specialty-content">
            <Slider {...settings}>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="specialty-outer">
                <div className="specialty-inner">
                  <img src={specialtyImg} />
                  <h4>Cơ xương khớp</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
