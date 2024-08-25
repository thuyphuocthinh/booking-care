import React, { Component } from "react";
import "../UserManage.scss";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { fetchAllDoctors } from "../../../store/actions/userActions";
import { languages } from "../../../utils/constant";
import {
  getDetailDoctorService,
  saveDoctorInfo,
  updateDetailDoctorService,
} from "../../../services/doctorService";
import { FormattedMessage } from "react-intl";
import {
  fetchPaymentsAction,
  fetchPricesAction,
  fetchProvincesAction,
  fetchSpecialtiesAction,
} from "../../../store/actions/adminActions";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasOldData: false,
      selectedOption: null,
      selectedDoctor: null,
      selectedPrice: null,
      selectedPayment: null,
      selectedProvince: null,
      selectedSpecialty: null,
      doctors: [],
      prices: [],
      provinces: [],
      payments: [],
      specialties: [],
      clinics: [],
      doctor: {
        doctorId: "",
        description: "",
        contentHTML: "",
        contentMarkdown: "",
        priceId: "",
        provinceId: "",
        specialtyId: "",
        paymentId: "",
        note: "",
        addressClinic: "",
        nameClinic: "",
      },
    };
  }

  handleChangeSelectDoctor = async (selectedOption) => {
    console.log(selectedOption);
    this.setState({
      selectedDoctor: selectedOption,
      doctor: {
        ...this.state.doctor,
        ["doctorId"]: parseInt(selectedOption.value),
      },
    });
    const resp = await getDetailDoctorService(selectedOption.value);
    if (resp.status === 200 && resp.data.errCode === 0) {
      const data = resp.data.data;
      if (data.doctorData) {
        this.setState({
          selectedDoctor: selectedOption,
          hasOldData: true,
          doctor: {
            ...this.state.doctor,
            contentHTML: data.doctorData.contentHTML,
            contentMarkdown: data.doctorData.contentMarkdown,
            description: data.doctorData.description,
          },
        });
      } else {
        this.setState({
          selectedDoctor: selectedOption,
          hasOldData: false,
          doctor: {
            ...this.state.doctor,
            contentHTML: "",
            contentMarkdown: "",
            description: "",
          },
        });
      }

      if (data.doctorInfoData) {
        const { language } = this.props;
        const selectedPayment = {
          value: data.doctorInfoData.paymentId,
          label:
            language === languages.VI
              ? data.doctorInfoData.paymentType.valueVi
              : data.doctorInfoData.paymentType.valueEn,
          name: "paymentId",
          selected: "selectedPayment",
        };
        const selectedProvince = {
          value: data.doctorInfoData.provinceId,
          label:
            language === languages.VI
              ? data.doctorInfoData.provinceType.valueVi
              : data.doctorInfoData.provinceType.valueEn,
          name: "provinceId",
          selected: "selectedProvince",
        };
        let titlePrice =
          language === languages.VI
            ? data.doctorInfoData.priceType.valueVi
            : data.doctorInfoData.priceType.valueEn;
        let currency = language === languages.VI ? "VND" : "USD";
        const selectedPrice = {
          value: data.doctorInfoData.priceId,
          label: parseInt(titlePrice).toLocaleString() + " " + currency,
          name: "priceId",
          selected: "selectedPrice",
        };
        this.setState({
          selectedDoctor: selectedOption,
          selectedPayment: selectedPayment,
          selectedProvince: selectedProvince,
          selectedPrice: selectedPrice,
          hasOldData: true,
          doctor: {
            ...this.state.doctor,
            note: data.doctorInfoData.note,
            addressClinic: data.doctorInfoData.addressClinic,
            nameClinic: data.doctorInfoData.nameClinic,
            priceId: selectedPrice.value,
            provinceId: selectedProvince.value,
            paymentId: selectedPayment.value,
          },
        });
      } else {
        this.setState({
          selectedDoctor: selectedOption,
          selectedPrice: null,
          selectedPayment: null,
          selectedProvince: null,
          selectedSpecialty: null,
          doctor: {
            ...this.state.doctor,
            note: "",
            addressClinic: "",
            nameClinic: "",
          },
        });
      }
    }
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      doctor: {
        ...this.state.doctor,
        ["contentHTML"]: html,
        ["contentMarkdown"]: text,
      },
    });
  };

  componentDidMount = () => {
    // call API => get data
    this.props.getAllDoctors();
    this.props.getPrices();
    this.props.getPayments();
    this.props.getProvinces();
    this.props.getSpecialties();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.doctors !== this.props.doctors) {
      this.setState({
        doctors: this.props.doctors,
      });
    }
    if (prevProps.prices !== this.props.prices) {
      this.setState({
        prices: this.props.prices,
      });
    }
    if (prevProps.payments !== this.props.payments) {
      this.setState({
        payments: this.props.payments,
      });
    }
    if (prevProps.provinces !== this.props.provinces) {
      this.setState({
        provinces: this.props.provinces,
      });
    }
    if (prevProps.specialties !== this.props.specialties) {
      this.setState({
        specialties: this.props.specialties,
      });
    }
  };

  componentWillUnmount() {
    // before kill the component
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      doctor: { ...this.state.doctor, [name]: value },
    });
  };

  validate = () => {
    let isValid = true;
    const arrCheck = [
      "doctorId",
      "description",
      "contentHTML",
      "contentMarkdown",
      "priceId",
      "specialtyId",
      "paymentId",
      "provinceId",
      "addressClinic",
      "nameClinic",
    ];
    const arrEmptyFields = [];
    for (const item of arrCheck) {
      if (!this.state.doctor[item]) {
        isValid = false;
        arrEmptyFields.push(item);
      }
    }
    return { isValid, arrEmptyFields };
  };

  handleSubmit = async () => {
    if (this.validate().isValid) {
      const resp = await saveDoctorInfo(this.state.doctor);
      if (resp.status === 200 && resp.data.errCode === 0) {
        toast.success("Save doctor info successfully");
        this.setState({
          doctor: {
            doctorId: "",
            description: "",
            contentHTML: "",
            contentMarkdown: "",
            priceId: "",
            provinceId: "",
            paymentId: "",
            note: "",
            addressClinic: "",
            nameClinic: "",
            specialtyId: "",
          },
          selectedDoctor: null,
          selectedPrice: null,
          selectedPayment: null,
          selectedProvince: null,
          selectedSpecialty: null,
        });
      }
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      toast.error(msg + " cannot be empty.");
    }
  };

  handleUpdate = async () => {
    if (this.validate().isValid) {
      const resp = await updateDetailDoctorService(this.state.doctor);
      if (resp.status === 200 && resp.data.errCode === 0) {
        toast.success("Update doctor info successfully");
        this.setState({
          doctor: {
            doctorId: "",
            description: "",
            contentHTML: "",
            contentMarkdown: "",
            priceId: "",
            provinceId: "",
            paymentId: "",
            note: "",
            addressClinic: "",
            nameClinic: "",
            specialtyId: "",
          },
          selectedDoctor: null,
          selectedPrice: null,
          selectedPayment: null,
          selectedProvince: null,
          selectedSpecialty: null,
          hasOldData: false,
        });
      }
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      toast.error(msg + " cannot be empty.");
    }
  };

  handleChangeSelectCommon = (selectedOption) => {
    const { value, name, selected } = selectedOption;
    this.setState({
      [selected]: selectedOption,
      doctor: {
        ...this.state.doctor,
        [name]: value,
      },
    });
  };

  render() {
    const {
      selectedSpecialty,
      selectedDoctor,
      selectedPayment,
      selectedPrice,
      selectedProvince,
    } = this.state;
    return (
      <div className="container">
        <div className="title my-5">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="row mb-5">
          <div className="col-md-6 mb-md-0 mb-5">
            <label htmlFor="doctorId" className="form-label fw-bold">
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={selectedDoctor}
              onChange={this.handleChangeSelectDoctor}
              options={this.state.doctors.map((item) => {
                const { language } = this.props;
                const title =
                  language === languages.VI
                    ? item.positionData.valueVI
                    : item.positionData.valueEn;
                return {
                  value: item.id,
                  label: title + " " + item.lastName + " " + item.firstName,
                };
              })}
              placeholder={"Chọn bác sĩ"}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="description">
              <FormattedMessage id="admin.manage-doctor.intro-doctor" />
            </label>
            <textarea
              onChange={this.handleInputChange}
              value={this.state.doctor.description}
              rows={5}
              name="description"
              id="description"
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="priceId">
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                name="priceId"
                id="priceId"
                value={selectedPrice}
                onChange={this.handleChangeSelectCommon}
                options={this.state.prices.map((item) => {
                  const { language } = this.props;
                  let title =
                    language === languages.VI ? item.valueVi : item.valueEn;
                  let currency = language === languages.VI ? "VND" : "USD";
                  return {
                    value: item.keyMap,
                    label: parseInt(title).toLocaleString() + " " + currency,
                    name: "priceId",
                    selected: "selectedPrice",
                  };
                })}
                placeholder={"Chọn giá"}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-label form-group">
              <label className="form-label fw-bold" htmlFor="paymentId">
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                name="paymentId"
                id="paymentId"
                value={selectedPayment}
                onChange={this.handleChangeSelectCommon}
                options={this.state.payments.map((item) => {
                  const { language } = this.props;
                  const title =
                    language === languages.VI ? item.valueVi : item.valueEn;
                  return {
                    value: item.keyMap,
                    label: title,
                    name: "paymentId",
                    selected: "selectedPayment",
                  };
                })}
                placeholder={"Chọn phương thức thanh toán"}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="provinceId">
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                id="provinceId"
                name="provinceId"
                value={selectedProvince}
                onChange={this.handleChangeSelectCommon}
                options={this.state.provinces.map((item) => {
                  const { language } = this.props;
                  const title =
                    language === languages.VI ? item.valueVi : item.valueEn;
                  return {
                    value: item.keyMap,
                    label: title,
                    name: "provinceId",
                    selected: "selectedProvince",
                  };
                })}
                placeholder={"Chọn tỉnh"}
              />
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="addressClinic">
                <FormattedMessage id="admin.manage-doctor.addressClinic" />
              </label>
              <input
                type="text"
                name="addressClinic"
                id="addressClinic"
                className="form-control"
                value={this.state.doctor.addressClinic}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="nameClinic">
                <FormattedMessage id="admin.manage-doctor.nameClinic" />
              </label>
              <input
                type="text"
                id="nameClinic"
                name="nameClinic"
                className="form-control"
                value={this.state.doctor.nameClinic}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="note">
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                type="text"
                id="note"
                name="note"
                className="form-control"
                value={this.state.doctor.note}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="priceId">
                <FormattedMessage id="admin.manage-doctor.specialty" />
              </label>
              <Select
                name="specialtyId"
                id="specialtyId"
                value={selectedSpecialty}
                onChange={this.handleChangeSelectCommon}
                options={this.state.specialties.map((item) => {
                  return {
                    value: item.id,
                    label: item.name,
                    name: "specialtyId",
                    selected: "selectedSpecialty",
                  };
                })}
                placeholder={"Chọn chuyên khoa"}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="priceId">
                <FormattedMessage id="admin.manage-doctor.clinic" />
              </label>
              <Select
                // name="clinicId"
                // id="clinicId"
                // value={selectedClinic}
                // onChange={this.handleChangeSelectCommon}
                // options={this.state.prices.map((item) => {
                //   const { language } = this.props;
                //   let title =
                //     language === languages.VI ? item.valueVi : item.valueEn;
                //   let currency = language === languages.VI ? "VND" : "USD";
                //   return {
                //     value: item.keyMap,
                //     label: parseInt(title).toLocaleString() + " " + currency,
                //     name: "clinicId",
                //     selected: "selectedClinic",
                //   };
                // })}
                placeholder={"Chọn phòng khám"}
              />
            </div>
          </div>
        </div>
        <div className="manage-doctor-editor mb-5">
          <label className="form-label fw-bold">
            <FormattedMessage id="admin.manage-doctor.detail-doctor" />
          </label>
          <MdEditor
            style={{ height: "400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.doctor.contentMarkdown}
          />
        </div>
        <div className="mb-5">
          {!this.state.hasOldData ? (
            <button
              onClick={this.handleSubmit}
              className="btn btn-primary px-3"
            >
              <FormattedMessage id="admin.manage-doctor.save" />
            </button>
          ) : (
            <button
              onClick={this.handleUpdate}
              className="btn btn-success px-3"
            >
              <FormattedMessage id="admin.manage-doctor.update" />
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctors: state.user.doctors,
    language: state.app.language,
    prices: state.admin.prices,
    payments: state.admin.payments,
    provinces: state.admin.provinces,
    specialties: state.admin.specialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(fetchAllDoctors()),
    getPrices: () => dispatch(fetchPricesAction()),
    getPayments: () => dispatch(fetchPaymentsAction()),
    getProvinces: () => dispatch(fetchProvincesAction()),
    getSpecialties: () => dispatch(fetchSpecialtiesAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
