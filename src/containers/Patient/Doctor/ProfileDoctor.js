import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorService } from "../../../services/doctorService";
import { languages } from "../../../utils/constant";
import moment from "moment";
import localization from "moment/locale/vi";
import NumberFormat from "react-number-format";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentDidMount = async () => {
    const { doctorId } = this.props;
    try {
      if (doctorId) {
        const resp = await getProfileDoctorService(doctorId);
        if (resp.status === 200 && resp.data.errCode === 0) {
          this.setState({
            profile: resp.data.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderTimeBooking = () => {
    const { dataTime } = this.props;
    const { date } = dataTime;
    const { timeTypeData } = dataTime;
    const dateFormat = moment(date)
      .locale(this.props.language === languages.VI ? "vi" : "en")
      .format("dddd - DD/MM/YYYY");
    const time =
      this.props.language === languages.VI
        ? timeTypeData.valueVI
        : timeTypeData.valueEn;
    return (
      <>
        <p className="m-0 p-0 d-flex align-items-center gap-3">
          <span className="fw-bold">Thời gian</span>
          <span style={{ fontSize: "16px" }} className="badge text-bg-warning">
            {time} - {dateFormat}
          </span>
        </p>
      </>
    );
  };

  renderSpecialty = () => {
    const { profile } = this.state;
    if (this.props.dataTime) {
      const { doctorInfoData } = profile;
      return (
        <p className="m-0 p-0 d-flex align-items-center gap-4">
          <span className="fw-bold">Địa chỉ</span>
          <span
            style={{ fontSize: "16px" }}
            className="badge text-bg-secondary"
          >
            {doctorInfoData?.nameClinic} - {doctorInfoData?.addressClinic}
          </span>
        </p>
      );
    }
  };

  renderIntroDoctor = () => {
    const { language } = this.props;
    const { profile } = this.state;
    const title =
      language === languages.VI
        ? this.state.profile.positionData?.valueVI
        : this.state.profile.positionData?.valueEn;
    const fullName =
      this.state.profile?.lastName + " " + this.state.profile?.firstName;
    const price =
      language === languages.VI
        ? profile.doctorInfoData?.priceType.valueVi
        : profile.doctorInfoData?.priceType.valueEn;
    return (
      <>
        <div className="col-md-3 col-12 text-center">
          <img
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "50%",
              backgroundSize: "cover",
            }}
            className="avatar"
            src={this.state.profile?.image}
          />
        </div>
        <div className="col-md-9 col-12">
          <h4 className="fw-bold">
            {title} {fullName}
          </h4>
          {this.state.profile.doctorData?.description ? (
            <p>{this.state.profile.doctorData.description}</p>
          ) : (
            ""
          )}
        </div>
        <div className="col-12 mt-5">
          <p
            className="d-flex align-items-center gap-3"
            style={{ fontSize: "14px" }}
          >
            <span className="fw-bold">Giá khám </span>
            <span
              style={{ fontSize: "16px" }}
              className="badge text-bg-success"
            >
              <NumberFormat
                value={price}
                displayType="text"
                thousandSeparator={true}
                suffix={this.props.language === languages.VI ? " VND" : " $"}
              />
            </span>
          </p>
        </div>
      </>
    );
  };

  render() {
    return (
      <>
        {this.renderIntroDoctor()}
        <p>{this.renderTimeBooking()}</p>
        <p>{this.renderSpecialty()}</p>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
