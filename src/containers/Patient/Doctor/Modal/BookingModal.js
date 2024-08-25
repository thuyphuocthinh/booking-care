import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./BookingModal.scss";
import DatePicker from "../../../../components/Input/DatePicker";
import { FormattedMessage } from "react-intl";
import localization from "moment/locale/vi";
import Select from "react-select";
import { toast } from "react-toastify";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { languages } from "../../../../utils";
import { fetchGenderStart } from "../../../../store/actions/adminActions";
import { saveBookingInfoService } from "../../../../services/bookingService";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGender: null,
      genders: [],
      bookingInfo: {
        email: "",
        fullName: "",
        reason: "",
        birthday: "",
        gender: "",
        address: "",
        phoneNumber: "",
        date: this.props.dataTime?.date || "",
        timeType: this.props.dataTime?.timeType || "",
        doctorId: this.props.dataTime?.doctorId || "",
        language: this.props.language,
        doctorFirstName: this.props.dataTime.doctorInfo?.firstName || "",
        doctorLastName: this.props.dataTime.doctorInfo?.lastName || "",
      },
    };
  }

  formatDateTime = () => {
    const { dataTime } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      const { date } = dataTime;
      const { timeTypeData } = dataTime;
      const dateFormat = moment(date)
        .locale(this.props.language === languages.VI ? "vi" : "en")
        .format("dddd - DD/MM/YYYY");
      const time =
        this.props.language === languages.VI
          ? timeTypeData.valueVI
          : timeTypeData.valueEn;
      return `${time} - ${dateFormat}`;
    }
    return "";
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      bookingInfo: {
        ...this.state.bookingInfo,
        [name]: value,
      },
    });
  };

  handleClose = () => {
    this.props.closeModal();
  };

  componentDidMount = () => {
    this.props.getGender();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.openModal !== this.props.openModal) {
      this.setState({
        isOpen: this.props.openModal,
      });
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genders: this.props.genders,
      });
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      const { dataTime } = this.props;
      this.setState({
        bookingInfo: {
          ...this.state.bookingInfo,
          ["dateTimeFormat"]: this.formatDateTime(),
          ["doctorId"]: dataTime.doctorId,
          ["timeType"]: dataTime.timeType,
          ["date"]: dataTime.date,
          ["doctorFirstName"]: dataTime.doctorInfo.firstName,
          ["doctorLastName"]: dataTime.doctorInfo.lastName,
        },
      });
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        bookingInfo: {
          ...this.state.bookingInfo,
          ["language"]: this.props.language,
          ["dateTimeFormat"]: this.formatDateTime(),
        },
      });
    }
  };

  handleOpen = () => {
    this.props.openModal();
  };

  validate = () => {
    let isValid = true;
    const arrCheck = [
      "email",
      "fullName",
      "reason",
      "birthday",
      "gender",
      "address",
      "phoneNumber",
    ];
    const arrEmptyFields = [];
    for (const item of arrCheck) {
      if (!this.state.bookingInfo[item]) {
        isValid = false;
        arrEmptyFields.push(item);
      }
    }
    return { isValid, arrEmptyFields };
  };

  handleSubmit = async () => {
    if (this.validate().isValid) {
      const resp = await saveBookingInfoService(this.state.bookingInfo);
      if (resp.status === 200 && resp.data.errCode === 0) {
        toast.success(resp.data.msg);
        this.handleClose();
        this.setState({
          bookingInfo: {
            email: "",
            fullName: "",
            reason: "",
            birthday: "",
            gender: "",
            address: "",
            phoneNumber: "",
            date: this.props.dataTime.date,
            timeType: this.props.dataTime.timeType,
            doctorId: this.props.dataTime.doctorId,
          },
        });
      }
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      toast.error(msg + " cannot be empty.");
    }
  };

  handleChangeDate = (value) => {
    this.setState({
      bookingInfo: {
        ...this.state.bookingInfo,
        ["birthday"]: new Date(value[0]),
      },
    });
  };

  handleChangeSelectCommon = (selectedOption) => {
    const { value, name, selected } = selectedOption;
    this.setState({
      [selected]: selectedOption,
      bookingInfo: {
        ...this.state.bookingInfo,
        [name]: value,
      },
    });
  };

  render() {
    const { dataTime } = this.props;
    const doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    const { selectedGender } = this.state;
    return (
      <Fragment>
        <Modal
          isOpen={this.props.isOpenModal}
          toggle={this.handleClose}
          {...this.props}
          id="booking-modal"
        >
          <ModalHeader toggle={this.handleClose}>
            Đặt lịch khám bệnh
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <ProfileDoctor doctorId={doctorId} dataTime={dataTime} />
              <div className="card p-0 m-0">
                <div className="card-header fw-bold">
                  Vui lòng điền thông tin các nhân
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-6">
                      <div className="form-group">
                        <label
                          className="form-label fw-bold"
                          htmlFor="fullName"
                        >
                          Họ tên
                        </label>
                        <input
                          className="form-control"
                          type="fullName"
                          name="fullName"
                          id="fullName"
                          value={this.state.bookingInfo.fullName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label
                          className="form-label fw-bold"
                          htmlFor="phoneNumber"
                        >
                          Số điện thoại
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={this.state.bookingInfo.phoneNumber}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <div className="form-group">
                        <label className="form-label fw-bold" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          id="email"
                          value={this.state.bookingInfo.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="form-label fw-bold" htmlFor="address">
                          Địa chỉ liên hệ
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          id="address"
                          value={this.state.bookingInfo.address}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="form-group">
                      <label htmlFor="reason" className="form-label fw-bold">
                        Lý do khám
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows={5}
                        className="form-control"
                        value={this.state.bookingInfo.reason}
                        onChange={this.handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <div className="form-group">
                        <label
                          className="form-label fw-bold"
                          htmlFor="birthday"
                        >
                          Ngày sinh
                        </label>
                        <DatePicker
                          className="form-control"
                          onChange={this.handleChangeDate}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label className="form-label fw-bold" htmlFor="gender">
                          Giới tính
                        </label>
                        <Select
                          name="gender"
                          id="gender"
                          value={selectedGender}
                          onChange={this.handleChangeSelectCommon}
                          options={this.state.genders.map((item) => {
                            const { language } = this.props;
                            let title =
                              language === languages.VI
                                ? item.valueVi
                                : item.valueEn;
                            return {
                              value: item.keyMap,
                              label: title,
                              name: "gender",
                              selected: "selectedGender",
                            };
                          })}
                          placeholder={"Chọn giới tính"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="px-2"
              color="primary"
              onClick={this.handleSubmit}
            >
              Xác nhận
            </Button>{" "}
            <Button
              className="px-2"
              color="secondary"
              onClick={this.handleClose}
            >
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
