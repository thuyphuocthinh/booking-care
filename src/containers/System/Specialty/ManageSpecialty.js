import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import CommonUtils from "../../../utils/CommonUtils";
import { toast } from "react-toastify";
import { saveSpecialtyInfoService } from "../../../services/specialtyService";
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
      submitInfo: {
        name: "",
        contentHTML: "",
        contentMarkdown: "",
        image: "",
      },
    };
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      ...this.state,
      submitInfo: {
        ...this.state.submitInfo,
        ["contentHTML"]: html,
        ["contentMarkdown"]: text,
      },
    });
  };

  handleUploadImage = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const base64 = await CommonUtils.getBase64(file);
    if (file) {
      const url = URL.createObjectURL(file);
      this.setState({
        ...this.state,
        imgUrl: url,
        submitInfo: {
          ...this.state.submitInfo,
          [name]: base64,
        },
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      submitInfo: {
        ...this.state.submitInfo,
        [name]: value,
      },
    });
  };

  validate = () => {
    let isValid = true;
    const arrCheck = ["name", "image", "contentHTML", "contentMarkdown"];
    const arrEmptyFields = [];
    for (const item of arrCheck) {
      if (!this.state.submitInfo[item]) {
        isValid = false;
        arrEmptyFields.push(item);
      }
    }
    return { isValid, arrEmptyFields };
  };

  handleSubmit = async () => {
    if (this.validate().isValid) {
      const resp = await saveSpecialtyInfoService(this.state.submitInfo);
      if (resp.status === 200 && resp.data.errCode === 0) {
        toast.success(resp.data.msg);
        this.setState({
          imgUrl: "",
          submitInfo: {
            name: "",
            contentHTML: "",
            contentMarkdown: "",
            image: "",
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
      <div className="manage-specialty-container">
        <div className="container">
          <div className="title my-5">Quản lí chuyên khoa</div>
          <div className="manage-specialty-form">
            <div className="row mb-5">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name" className="fw-bold form-label">
                    Tên chuyên khoa
                  </label>
                  <input
                    value={this.state.submitInfo.name}
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="image" className="fw-bold form-label">
                    Hình ảnh
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    onChange={this.handleUploadImage}
                  />
                </div>
                <div className="preview-image mt-3">
                  {this.state.imgUrl ? (
                    <img
                      className="img-thumbnail"
                      src={this.state.imgUrl}
                      style={{ width: "300px" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label fw-bold" htmlFor="description">
                    Chi tiết chuyên khoa
                  </label>
                  <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.submitInfo.contentMarkdown}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <button
                onClick={this.handleSubmit}
                className="btn btn-primary px-3"
              >
                Tạo mới
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
