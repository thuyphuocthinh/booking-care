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
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasOldData: false,
      selectedOption: null,
      doctors: [],
      doctor: {
        doctorId: "",
        description: "",
        contentHTML: "",
        contentMarkdown: "",
      },
    };
  }

  handleChangeSelect = async (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
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
          selectedOption: selectedOption,
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
          selectedOption: selectedOption,
          hasOldData: false,
          doctor: {
            ...this.state.doctor,
            contentHTML: "",
            contentMarkdown: "",
            description: "",
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
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.doctors !== this.props.doctors) {
      this.setState({
        doctors: this.props.doctors,
      });
    }
  };

  componentWillUnmount() {
    // before kill the component
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      {
        doctor: { ...this.state.doctor, [name]: value },
      },
      () => {
        console.log(this.state.doctor);
      }
    );
  };

  validate = () => {
    let isValid = true;
    const arrCheck = [
      "doctorId",
      "description",
      "contentHTML",
      "contentMarkdown",
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
      alert("Save doctor info successfully");
      this.setState({
        doctor: {
          doctorId: "",
          description: "",
          contentHTML: "",
          contentMarkdown: "",
        },
        selectedOption: null,
      });
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      alert(msg + " cannot be empty.");
    }
  };

  handleUpdate = async () => {
    if (this.validate().isValid) {
      const resp = await updateDetailDoctorService(this.state.doctor);
      console.log(resp);
      alert("Update doctor info successfully");
      this.setState({
        doctor: {
          doctorId: "",
          description: "",
          contentHTML: "",
          contentMarkdown: "",
        },
        selectedOption: null,
      });
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      alert(msg + " cannot be empty.");
    }
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <div className="title my-5">Tạo thêm thông tin bác sĩ</div>
        <div className="row mb-5">
          <div className="col-md-6 mb-md-0 mb-5">
            <label htmlFor="doctorId" className="form-label fw-bold">
              Chọn bác sĩ
            </label>
            <Select
              value={selectedOption}
              onChange={this.handleChangeSelect}
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
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold" htmlFor="description">
              Mô tả ngắn về bác sĩ
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
        <div className="manage-doctor-editor mb-5">
          <label className="form-label fw-bold">Chi tiết về bác sĩ</label>
          <MdEditor
            style={{ height: "500px" }}
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
              Lưu thông tin
            </button>
          ) : (
            <button
              onClick={this.handleUpdate}
              className="btn btn-success px-3"
            >
              Cập nhật
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(fetchAllDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
