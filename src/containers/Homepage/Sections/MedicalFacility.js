import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinicService } from "../../../services/clinicService";
import { NavLink } from "react-router-dom";

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
  constructor(props) {
    super(props);
    this.state = {
      clinics: [],
    };
  }

  componentDidMount = async () => {
    try {
      const resp = await getAllClinicService();
      if (resp.status === 200 && resp.data.errCode === 0) {
        this.setState({
          clinics: resp.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      slidesPerRow: 3,
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
              {this.state.clinics.map((item) => {
                return (
                  <div className="section-outer" key={item.id}>
                    <NavLink to={`/clinicDetail/${item.id}`}>
                      <div className="section-inner">
                        <div
                          style={{
                            background: `url(${item.image})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            height: "200px",
                          }}
                        ></div>
                        <h4 className="mt-5">{item.name}</h4>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
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
