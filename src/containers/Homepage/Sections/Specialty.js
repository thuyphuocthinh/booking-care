import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTopSpecialtyService } from "../../../services/specialtyService";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";

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
  constructor(props) {
    super(props);
    this.state = {
      specialties: [],
    };
  }

  componentDidMount = async () => {
    try {
      const resp = await getTopSpecialtyService(10);
      if (resp.status === 200 && resp.data.errCode === 0) {
        this.setState({
          specialties: resp.data.data,
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
      slidesPerRow: 4,
      draggable: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <div className="section section-specialty d-flex align-items-center">
        <div className="container">
          <div className="section-header">
            <h3>
              <FormattedMessage id="homepage.specialty" />
            </h3>
            <button>
              <FormattedMessage id="homepage.more-info" />{" "}
            </button>
          </div>
          <div className="section-content">
            <Slider {...settings}>
              {this.state.specialties.map((item) => {
                return (
                  <div className="section-outer" key={item.id}>
                    <NavLink to={`/specialtyDetail/${item.id}`}>
                      <div className="section-inner">
                        <img src={item.image} />
                        <h4>{item.name}</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
