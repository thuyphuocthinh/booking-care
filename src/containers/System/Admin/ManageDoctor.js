import React, { Component } from "react";
import "../UserManage.scss";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      doctor: {
        doctorId: "",
        description: "",
        contentHTML: "",
        contentMarkdown: "",
      },
    };
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
      doctor: {
        ...this.state.doctor,
        ["doctorId"]: selectedOption.value,
      },
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      doctor: {
        ...this.state.doctor,
        ["contentHTML"]: html,
        ["contentMarkdown"]: text,
      },
    });
  }

  componentDidMount = () => {
    // call API => get data
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

  handleSubmit = () => {
    console.log(this.state.doctor);
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
              onChange={this.handleChange}
              options={options}
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
          />
        </div>
        <div className="mb-5">
          <button onClick={this.handleSubmit} className="btn btn-primary px-3">
            Lưu thông tin
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
