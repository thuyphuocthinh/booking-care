import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { languages } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/scheduleService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }

  setArrDays = (language) => {
    const arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      if (language === languages.VI) {
        obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        obj.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      arrDate.push(obj);
    }
    this.setState({
      allDays: arrDate,
    });
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

  handleSelect = async (e) => {
    const { value } = e.target;
    const { doctorId } = this.props;
    try {
      const resp = await getScheduleDoctorByDate(doctorId, value);
      if (resp.status === 200 && resp.data.errCode === 0) {
        console.log(resp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="card">
        <div className="card-header fw-bold">Lịch khám</div>
        <div className="card-body">
          <div className="dates">
            <select
              name="date"
              className="form-select"
              style={{ width: "150px" }}
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
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
