import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientsService } from "../../../services/doctorService";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      patients: [],
    };
  }

  componentDidMount = async () => {
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

  render() {
    return (
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.patients.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.timeTypeBooking.valueVi}</td>
                        <td>
                          <button className="btn me-2 btn-success px-2">
                            Xác nhận
                          </button>
                          <button className="btn btn-primary px-2">
                            Gửi hóa đơn
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
