import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { fetchAllDoctors } from "../../../store/actions/userActions";
import { languages } from "../../../utils/constant";
import DatePicker from "../../../components/Input/DatePicker";
import { fetchScheduleAction } from "../../../store/actions/adminActions";
import moment from "moment";
import { toast } from "react-toastify";
import { bulkCreateNewScheduleService } from "../../../services/scheduleService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      doctors: [],
      currentDate: new Date(),
      schedule: [],
      submitInfo: {
        doctorId: "",
        date: new Date(),
        timeRange: [],
      },
    };
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
      submitInfo: {
        ...this.state.submitInfo,
        ["doctorId"]: selectedOption.value,
      },
    });
  };

  componentDidMount = () => {
    // call API => get data
    this.props.getAllDoctors();
    this.props.getSchedule();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.doctors !== this.props.doctors) {
      this.setState({
        doctors: this.props.doctors,
      });
    }
    if (prevProps.schedule !== this.props.schedule) {
      this.setState({
        schedule: this.props.schedule,
      });
    }
  };

  handleChangeDate = (value) => {
    this.setState({
      currentDate: value[0],
      submitInfo: {
        ...this.state.submitInfo,
        ["date"]: new Date(value[0]),
      },
    });
  };

  handleAddTime = (value) => {
    const timeRangeTmp = [...this.state.submitInfo.timeRange];
    const findIndex = timeRangeTmp.findIndex((item) => item === value);
    let updatedTimeRange;
    if (findIndex === -1) {
      timeRangeTmp.push(value);
    } else {
      timeRangeTmp.splice(findIndex, 1);
    }
    updatedTimeRange = timeRangeTmp;
    this.setState({
      submitInfo: {
        ...this.state.submitInfo,
        timeRange: updatedTimeRange,
      },
    });
  };

  validate = () => {
    let isValid = true;
    const arrCheck = ["doctorId", "date", "timeRange"];
    const arrEmptyFields = [];
    for (const item of arrCheck) {
      if (
        !this.state.submitInfo[item] ||
        this.state.submitInfo[item].length === 0
      ) {
        isValid = false;
        arrEmptyFields.push(item);
      }
    }
    if (isValid) {
      if (this.state.submitInfo.timeRange.length === 0) {
        isValid = false;
        arrEmptyFields.push("timeRange");
      }
    }
    return { isValid, arrEmptyFields };
  };

  handleSubmit = async () => {
    if (this.validate().isValid) {
      const result = [];
      for (const time of this.state.submitInfo.timeRange) {
        result.push({
          doctorId: this.state.submitInfo.doctorId,
          date: this.state.submitInfo.date,
          timeType: time,
        });
      }
      const resp = await bulkCreateNewScheduleService({
        arrSchedule: result,
        doctorId: this.state.selectedOption.value,
        date: new Date(this.state.currentDate),
      });
      if (resp.status === 200 && resp.data.errCode === 0) {
        toast.success(resp.data.msg);
        this.setState({
          selectedOption: null,
          currentDate: new Date(),
          submitInfo: {
            doctorId: "",
            date: "",
            timeRange: [],
          },
        });
      }
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      toast.error(msg + " cannot be empty");
    }
  };

  render() {
    return (
      <div className="container">
        <div className="schedule-container">
          <div className="title my-5">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="schedule-content">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label fw-bold">Chọn bác sĩ</label>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleChangeSelect}
                    options={this.state.doctors.map((item) => {
                      const { language } = this.props;
                      const title =
                        language === languages.VI
                          ? item.positionData.valueVI
                          : item.positionData.valueEn;
                      return {
                        value: item.id,
                        label:
                          title + " " + item.lastName + " " + item.firstName,
                      };
                    })}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label fw-bold">Chọn ngày</label>
                  <DatePicker
                    className="form-control"
                    onChange={this.handleChangeDate}
                    value={this.state.currentDate}
                    minDate={new Date()}
                  />
                </div>
              </div>
              <div className="col-12 mt-5">
                <div className="form-group">
                  <label className="form-label fw-bold">Chọn giờ</label>
                  <div className="d-flex align-items-center flex-wrap">
                    {this.state.schedule.map((item) => {
                      const index = this.state.submitInfo.timeRange.findIndex(
                        (item1) => item1 === item.keyMap
                      );
                      const selected = index === -1 ? false : true;
                      const time =
                        this.props.language === languages.VI
                          ? item.valueVi
                          : item.valueEn;
                      return (
                        <button
                          className={`btn ${
                            selected ? "btn-success" : "btn-secondary"
                          } px-2 me-2`}
                          onClick={() => this.handleAddTime(item.keyMap)}
                          key={item.id}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={() => {
                this.handleSubmit();
              }}
              className="btn btn-primary px-4"
            >
              Lưu thông tin
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctors: state.user.doctors,
    language: state.app.language,
    schedule: state.admin.schedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(fetchAllDoctors()),
    getSchedule: () => dispatch(fetchScheduleAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
