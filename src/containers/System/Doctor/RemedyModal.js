import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import _ from "lodash";
import moment from "moment";
import { CommonUtils } from "../../../utils";
import { sendRemedyService } from "../../../services/doctorService";
import LoadingOverlay from "react-loading-overlay";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitInfo: {
        email: "",
        image: "",
        timeType: "",
        patientId: "",
        doctorId: "",
        language: this.props.language,
      },
    };
  }

  componentDidUpdate = (prevProps, prevState, snapShot) => {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        submitInfo: {
          ...this.state.submitInfo,
          email: this.props.dataModal.patientData.email,
          timeType: this.props.dataModal.timeType,
          doctorId: this.props.dataModal.doctorId,
          patientId: this.props.dataModal.patientId,
        },
      });
    }
  };

  handleClose = () => {
    this.props.handleCloseModal();
  };

  componentDidMount = () => {
    if (this.props.dataModal && !_.isEmpty(this.props.dataModal)) {
      this.setState({
        submitInfo: {
          ...this.state.submitInfo,
          email: this.props.dataModal.patientData.email,
          timeType: this.props.dataModal.timeType,
          doctorId: this.props.dataModal.doctorId,
          patientId: this.props.dataModal.patientId,
          language: this.props.language,
        },
      });
    }
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      submitInfo: {
        ...this.state.submitInfo,
        [name]: value,
      },
    });
  };

  handleUploadImage = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    const base64 = await CommonUtils.getBase64(file);
    if (file) {
      this.setState({
        submitInfo: {
          ...this.state.submitInfo,
          [name]: base64,
        },
      });
    }
  };

  validate = () => {
    let isValid = true;
    const arrCheck = ["email", "image"];
    const arrEmptyFields = [];
    for (const item of arrCheck) {
      if (!this.state.submitInfo[item]) {
        isValid = false;
        arrEmptyFields.push(item);
      }
    }
    return { isValid, arrEmptyFields };
  };

  handleSendRemedy = async () => {
    if (this.validate().isValid) {
      this.props.handleShowLoading();
      const resp = await sendRemedyService(this.state.submitInfo);
      if (resp.status === 200 && resp.data.errCode === 0) {
        toast.success(resp.data.msg);
        this.props.handleHideLoading();
        this.props.handleCloseModal();
      }
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      toast.error(msg + " cannot be empty");
    }
  };

  render() {
    const { dataModal } = this.props;
    return (
      <Fragment>
        <Modal
          isOpen={this.props.isOpenModal}
          toggle={this.handleClose}
          {...this.props}
          id="remedy-modal"
        >
          <ModalHeader toggle={this.handleClose}>
            Gửi hóa đơn khám bệnh thành công
          </ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-bold" htmlFor="email">
                      Email bệnh nhân
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={this.state.submitInfo.email}
                      onChange={this.handleChangeInput}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label fw-bold" htmlFor="image">
                      Chọn file đơn thuốc
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={this.handleUploadImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="px-2"
              color="primary"
              onClick={this.handleSendRemedy}
            >
              Gửi hóa đơn
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
