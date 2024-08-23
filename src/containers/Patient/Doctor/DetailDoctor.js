import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../Homepage/HomeHeader";
import HomeFooter from "../../Homepage/HomeFooter";
import "./DetailDoctor.scss";
import { getDetailDoctorService } from "../../../services/doctorService";
import { languages } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorDetail: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        gender: "",
        roleId: "",
        positionId: "",
        createdAt: "",
        updatedAt: "",
        positionData: {
          valueEn: "",
          valueVI: "",
        },
        genderData: {
          valueEn: "",
          valueVI: "",
        },
        doctorData: {
          contentHTML: "",
          contentMarkdown: "",
          description: "",
        },
      },
    };
  }

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    if (id) {
      try {
        const resp = await getDetailDoctorService(id);
        if (resp.status === 200 && resp.data.errCode === 0) {
          this.setState({
            doctorDetail: resp.data.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  renderIntroDoctor = () => {
    const { language } = this.props;
    const title =
      language === languages.VI
        ? this.state.doctorDetail.positionData.valueVI
        : this.state.doctorDetail.positionData.valueEn;
    const fullName =
      this.state.doctorDetail.lastName +
      " " +
      this.state.doctorDetail.firstName;
    return (
      <>
        <div className="col-md-2 col-12">
          <img className="avatar" src={this.state.doctorDetail.image} />
        </div>
        <div className="col-md-10 col-12">
          <h3 className="fw-bold">
            {title} {fullName}
          </h3>
          {this.state.doctorDetail.doctorData?.description ? (
            <p>{this.state.doctorDetail.doctorData.description}</p>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  renderDetailDoctor = () => {
    if (this.state.doctorDetail.doctorData) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.doctorDetail.doctorData.contentHTML,
          }}
        ></div>
      );
    }
    return <></>;
  };

  render() {
    return (
      <div>
        <HomeHeader />
        <div className="container">
          <div className="detail-doctor-section my-5">
            <div className="row">
              <div className="col-12">
                <div className="intro-doctor">
                  <div className="row align-items-center">
                    {this.renderIntroDoctor()}
                  </div>
                </div>
              </div>
              <div className="col-md-7 mt-5">
                <div className="schedule-doctor">
                  <DoctorSchedule doctorId={this.props.match.params.id} />
                </div>
              </div>
              <div className="col-md-5 mt-5">
                <div className="card">
                  <div className="card-header fw-bold">Phòng khám</div>
                  <div className="card-body"></div>
                </div>
              </div>
              <div className="col-12 mt-5">
                <div className="detail-doctor">
                  <div className="card">
                    <div className="card-header fw-bold">Chi tiết</div>
                    <div className="card-body">{this.renderDetailDoctor()}</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="comment-doctor"></div>
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
