import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../Homepage/HomeHeader";
import HomeFooter from "../../Homepage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDoctorIdsByClinicService,
  getDoctorIdsByProvinceService,
  getDoctorIdsBySpecialtyService,
} from "../../../services/doctorService";
import _ from "lodash";
import { fetchProvincesAction } from "../../../store/actions";
import { languages } from "../../../utils";
import { NavLink } from "react-router-dom";
import { getDetailClinicService } from "../../../services/clinicService";
import "./DetailClinic.scss";

const arrDoctorIds = [32, 34];

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      provinces: [],
      clinic: {},
      doctorIds: [],
    };
  }

  componentDidMount = async () => {
    this.getDoctorIds();
    this.getDetailClinic();
    this.props.getProvinces();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.provinces !== this.props.provinces) {
      this.setState({
        provinces: this.props.provinces,
      });
    }
  };

  getDoctorIds = async () => {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      try {
        const resp = await getDoctorIdsByClinicService(id);
        if (resp.status === 200 && resp.data.errCode === 0) {
          this.setState({
            doctorIds: resp.data.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  getDetailClinic = async () => {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      try {
        const resp = await getDetailClinicService(id);
        if (resp.status === 200 && resp.data.errCode === 0) {
          this.setState({
            clinic: resp.data.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  renderDetailClinic = () => {
    if (this.state.clinic && !_.isEmpty(this.state.clinic)) {
      return (
        <div className="detail-clinic-description-top">
          <h3 className="fw-bold m-0 p-0">{this.state.clinic.name}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.clinic.contentHTML,
            }}
            className="my-4 description px-3 pt-3"
            style={{
              height: this.state.showDetail ? "fit-content" : "285px",
              overflow: "hidden",
            }}
          ></div>
          {!this.state.showDetail ? (
            <button
              onClick={() => {
                this.setState({
                  showDetail: true,
                });
              }}
              className="btn btn-secondary px-3"
            >
              Chi tiết
            </button>
          ) : (
            <button
              onClick={() => {
                this.setState({
                  showDetail: false,
                });
              }}
              className="btn btn-secondary px-3"
            >
              Thu gọn
            </button>
          )}
        </div>
      );
    }
  };

  handleSelect = async (e) => {
    const { name, value } = e.target;
    console.log(value);
    try {
      let resp;
      if (value === "all") {
        this.getDoctorIds();
      } else {
        const { id } = this.props.match.params;
        resp = await getDoctorIdsByProvinceService(value, id);
        if (resp.status === 200 && resp.data.errCode === 0) {
          this.setState(
            {
              doctorIds: resp.data.data,
            },
            () => console.log(this.state.doctorIds)
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Fragment>
        <HomeHeader />
        <div className="detail-clinic-container">
          <div className="detail-clinic-description">
            <div className="background-blur"></div>
            <div className="container">{this.renderDetailClinic()}</div>
          </div>
          <div className="detail-clinic-content my-5">
            <div className="container">
              <div className="row">
                {this.state.doctorIds.length > 0 ? (
                  this.state.doctorIds.map((item, index) => {
                    return (
                      <div
                        className={`col-12 ${
                          index !== arrDoctorIds.length - 1 ? "mb-5" : ""
                        }`}
                      >
                        <div className="detail-clinic">
                          <div className="row">
                            <div className="col-md-6">
                              <ProfileDoctor doctorId={item} dataTime={""} />
                              <NavLink
                                style={{
                                  marginLeft: "35px",
                                }}
                                to={`/doctorDetail/${item}`}
                              >
                                Xem thêm
                              </NavLink>
                            </div>
                            <div className="col-md-6">
                              <DoctorSchedule doctorId={item} />
                              <div className="mt-3">
                                <DoctorExtraInfo doctorId={item} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p
                    className="text-center"
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    Không có dữ liệu
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    provinces: state.admin.provinces,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProvinces: () => dispatch(fetchProvincesAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
