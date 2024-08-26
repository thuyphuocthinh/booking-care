import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientsService } from "../../../services/doctorService";
import { languages } from "../../../utils";
import RemedyModal from "./RemedyModal";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      patients: [],
      isOpenModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  componentDidMount = async () => {
    this.getListPatients();
  };

  getListPatients = async () => {
    const { currentDate } = this.state;
    try {
      const dateFormat = new Date(currentDate).getTime();
      const resp = await getListPatientsService(
        this.props.userInfo.id,
        dateFormat
      );
      if (resp.status === 200 && resp.data.data) {
        this.setState({
          patients: resp.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChangeDate = async (value) => {
    const dateFormat = new Date(value).getTime();
    if (!isNaN(dateFormat)) {
      try {
        const resp = await getListPatientsService(
          this.props.userInfo.id,
          dateFormat
        );
        if (resp.status === 200 && resp.data.data) {
          this.setState({
            patients: resp.data.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  handleConfirm = (item) => {
    this.setState({
      isOpenModal: true,
      dataModal: item,
    });
  };

  handleShowLoading = () => {
    this.setState({
      isShowLoading: true,
    });
  };

  handleHideLoading = () => {
    this.setState(
      {
        isShowLoading: false,
      },
      () => {
        this.getListPatients();
      }
    );
  };

  render() {
    return (
      <Fragment>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          styles={{
            overlay: (base) => ({
              ...base,
              height: "100vh",
              marginTop: "-80px",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000000,
            }),
          }}
        >
          <RemedyModal
            handleCloseModal={this.handleCloseModal}
            isOpenModal={this.state.isOpenModal}
            dataModal={this.state.dataModal}
            handleShowLoading={this.handleShowLoading}
            handleHideLoading={this.handleHideLoading}
          />
          <div className="manage-patient-container">
            <div className="container">
              <div className="title my-5">Quản lí lịch hẹn</div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-bold">Chọn ngày khám</label>
                    <DatePicker
                      className="form-control"
                      onChange={this.handleChangeDate}
                      value={this.state.currentDate}
                    />
                  </div>
                </div>
              </div>
              <div className="row my-5">
                <div className="col-12">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Tên bệnh nhân</th>
                        <th>Giờ</th>
                        <th>Địa chỉ</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.patients.length > 0 ? (
                        this.state.patients.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.timeTypeBooking.valueVi}</td>
                              <td>{item.patientData.address}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    this.handleConfirm(item);
                                  }}
                                  className="btn me-2 btn-success px-2"
                                >
                                  Xác nhận
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5}>Không có dữ liệu</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
