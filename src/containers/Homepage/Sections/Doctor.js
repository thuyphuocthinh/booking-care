import React, { Component } from "react";
import { connect } from "react-redux";
import "./Doctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import doctorImg from "../../../assets/images/doctor.png";
import { fetchTopDoctors } from "../../../store/actions/userActions";
import { languages } from "../../../utils/constant";
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

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctors: [],
    };
  }

  componentDidMount = () => {
    this.props.loadTopDoctor();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState(
        {
          topDoctors: this.props.topDoctors,
        },
        () => {
          console.log(this.state.topDoctors);
        }
      );
    }
  };

  render() {
    const { language } = this.props;
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
            <h3>
              <FormattedMessage id="homepage.outstanding-doctor" />
            </h3>
            <button>
              <FormattedMessage id="homepage.more-info" />{" "}
            </button>
          </div>
          <div className="section-content">
            <Slider {...settings}>
              {this.state.topDoctors.map((item) => {
                let imageBase64;
                if (item.image.data && item.image.data.length > 0) {
                  imageBase64 = new Buffer(item.image.data, "base64").toString(
                    "binary"
                  );
                } else {
                  imageBase64 = doctorImg;
                }
                const position =
                  language === languages.VI
                    ? item.positionData.valueVI
                    : item.positionData.valueEn;
                return (
                  <div className="section-outer" key={item.id}>
                    <div className="section-inner">
                      <img src={imageBase64} />
                      <h4 className="mt-3 mb-2">{position}</h4>
                      <h4>
                        {item.lastName} {item.firstName}
                      </h4>
                      <h5>Cơ xương khớp</h5>
                    </div>
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
    topDoctors: state.user.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(fetchTopDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
