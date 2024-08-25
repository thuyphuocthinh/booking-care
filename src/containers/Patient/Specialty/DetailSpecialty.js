import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../Homepage/HomeHeader";
import HomeFooter from "../../Homepage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailSpecialtyService } from "../../../services/specialtyService";
import {
  getDoctorIdsByProvinceService,
  getDoctorIdsBySpecialtyService,
} from "../../../services/doctorService";
import _ from "lodash";
import { fetchProvincesAction } from "../../../store/actions";
import { languages } from "../../../utils";
import { NavLink } from "react-router-dom";

const arrDoctorIds = [32, 34];

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      provinces: [],
      specialty: {},
      doctorIds: [],
    };
  }

  componentDidMount = async () => {
    this.getDoctorIds();
    this.getDetailSpecialty();
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
        const resp = await getDoctorIdsBySpecialtyService(id);
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

  getDetailSpecialty = async () => {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      try {
        const resp = await getDetailSpecialtyService(id);
        if (resp.status === 200 && resp.data.errCode === 0) {
          this.setState({
            specialty: resp.data.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  renderDetailSpecialty = () => {
    if (this.state.specialty && !_.isEmpty(this.state.specialty)) {
      return (
        <div className="detail-specialty-description-top">
          <h3 className="fw-bold m-0 p-0">{this.state.specialty.name}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.specialty.contentHTML,
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
        <div className="detail-specialty-container">
          <div className="detail-specialty-description">
            <div className="background-blur"></div>
            <div className="container">{this.renderDetailSpecialty()}</div>
          </div>
          <div className="container">
            <div className="row mt-5">
              <div className="col-md-6">
                <select
                  onChange={this.handleSelect}
                  className="form-select"
                  name="provinceId"
                  style={{ width: "200px" }}
                >
                  <option selected value="all">
                    Toàn quốc
                  </option>
                  {this.state.provinces.map((item) => {
                    const title =
                      this.props.language === languages.VI
                        ? item.valueVi
                        : item.valueEn;
                    return (
                      <option key={item.id} value={item.keyMap}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="detail-specialty-content my-5">
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
                        <div className="detail-specialty">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
