import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sectionImg from "../../../assets/images/specialty.jpg";

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

class MedicalFacility extends Component {
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
      <div className="section medical-facility-section d-flex align-items-center">
        <div className="container">
          <div className="section-header">
            <h3>Cơ sở y tế nổi bật</h3>
            <button> Xem thêm </button>
          </div>
          <div className="section-content">
            <Slider {...settings}>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
                  <h4>Cơ xương khớp</h4>
                </div>
              </div>
              <div className="section-outer">
                <div className="section-inner">
                  <img src={sectionImg} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
