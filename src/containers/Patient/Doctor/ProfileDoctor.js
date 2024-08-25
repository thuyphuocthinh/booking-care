import React, { Component, Fragment } from "react";
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

  renderExtraInfo = () => {
    // price
    if (this.props.dataTime) {
      const { language } = this.props;
      const { profile } = this.state;
      const price =
        language === languages.VI
          ? profile.doctorInfoData?.priceType.valueVi
          : profile.doctorInfoData?.priceType.valueEn;
      // address
      const { doctorInfoData } = profile;
      // time
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
        <Fragment>
          <table className="table table-striped table-hover my-4">
            <thead>
              <tr>
                <th>Giá khám</th>
                <th>Thời gian</th>
                <th>Địa điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <NumberFormat
                    value={price}
                    displayType="text"
                    thousandSeparator={true}
                    suffix={
                      this.props.language === languages.VI ? " VND" : " $"
                    }
                  />
                </td>
                <td>
                  {time} - {dateFormat}
                </td>
                <td>
                  <p className="mb-2 p-0">{doctorInfoData?.nameClinic}</p>
                  <p className="m-0 p-0">{doctorInfoData?.addressClinic}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </Fragment>
      );
    }
    return "";
  };

  renderIntroDoctor = () => {
    const { language } = this.props;
    const title =
      language === languages.VI
        ? this.state.profile.positionData?.valueVI
        : this.state.profile.positionData?.valueEn;
    const fullName =
      this.state.profile?.lastName + " " + this.state.profile?.firstName;

    return (
      <div className="row d-flex align-items-center my-3">
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
            <p className="p-0 m-0">
              {this.state.profile.doctorData.description}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.renderIntroDoctor()}
        {this.renderExtraInfo()}
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
