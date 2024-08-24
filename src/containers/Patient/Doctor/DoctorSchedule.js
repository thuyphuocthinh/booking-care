import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import { languages } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/scheduleService";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTime: {},
      allDays: [],
      timesByDay: [],
      initialDay: "",
      isOpenModal: false,
    };
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  setArrDays = (language) => {
    const arrDate = [];
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      if (language === languages.VI) {
        let time = moment(new Date()).add(i, "days")._d;
        let labelVi;
        let timeStr = moment(time).format("DD/MM/YYYY");
        let todayStr = moment(today).format("DD/MM/YYYY");
        if (todayStr === timeStr) {
          labelVi = "Hôm nay - " + moment(time).format("DD/MM");
        } else {
          labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        }
        obj.label = this.capitalizeFirstLetter(labelVi);
      } else {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      arrDate.push(obj);
    }
    this.setState(
      {
        allDays: arrDate,
        initialDay: arrDate[0].value,
      },
      () => {
        this.getSchedule(this.props.doctorId, this.state.initialDay);
      }
    );
  };

  componentDidMount = async () => {
    const { language } = this.props;
    this.setArrDays(language);
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    const { language } = this.props;
    if (language !== prevProps.language) {
      this.setArrDays(language);
    }
  };

  getSchedule = async (doctorId, value) => {
    try {
      const resp = await getScheduleDoctorByDate(doctorId, value);
      if (resp.status === 200 && resp.data.errCode === 0) {
        this.setState({
          timesByDay: resp.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSelect = async (e) => {
    const { value } = e.target;
    const { doctorId } = this.props;
    this.getSchedule(doctorId, value);
  };

  openModal = (data) => {
    this.setState({
      isOpenModal: true,
      dataTime: data,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    return (
      <Fragment>
        <BookingModal
          isOpenModal={this.state.isOpenModal}
          openModal={this.openModal}
          closeModal={this.closeModal}
          dataTime={this.state.dataTime}
        />
        <div className="card">
          <div className="card-header fw-bold">
            <i className="fas fa-calendar-alt"></i>
            <span className="ms-2">
              Lịch khám (Chọn ngày để xem thông tin lịch khám)
            </span>
          </div>
          <div className="card-body">
            <div className="dates my-2">
              <select
                name="date"
                className="form-select"
                style={{ width: "200px" }}
                onChange={this.handleSelect}
              >
                {this.state.allDays.map((item) => {
                  return (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="times">
              {this.state.timesByDay.length > 0 ? (
                <div className="mt-3 d-flex flex-wrap align-items-center">
                  {this.state.timesByDay.map((item) => {
                    const time =
                      this.props.language === languages.VI
                        ? item.timeTypeData.valueVI
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        className="btn btn-warning px-4 me-3 mb-3"
                        style={{
                          height: "40px",
                          width: "180px",
                        }}
                        onClick={() => this.openModal(item)}
                        key={item.id}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 p-0 mb-0">Hiện không có lịch khám nào</p>
              )}
            </div>
          </div>
        </div>
      </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
