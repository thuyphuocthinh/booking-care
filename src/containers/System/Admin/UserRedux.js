import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions/adminActions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import {
  addNewUserService,
  updateUserService,
} from "../../../services/userService";
import TableUser from "./TableUser";
import CommonUtils from "../../../utils/CommonUtils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phoneNumber: "",
        gender: "",
        image: "",
        roleId: "",
        positionId: "",
      },
      genders: [],
      roles: [],
      positions: [],
      imgUrl: "",
      isOpen: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        ...this.state,
        genders: this.props.genders,
      });
    }
    if (prevProps.roles !== this.props.roles) {
      this.setState({
        ...this.state,
        roles: this.props.roles,
      });
    }
    if (prevProps.positions !== this.props.positions) {
      this.setState({
        ...this.state,
        positions: this.props.positions,
      });
    }
    if (prevProps.currentUser !== this.props.currentUser) {
      let imageBase64 = "";
      if (this.props.currentUser.image) {
        imageBase64 = new Buffer(
          this.props.currentUser.image.data,
          "base64"
        ).toString("binary");
      }
      this.setState({
        ...this.state,
        user: {
          firstName: this.props.currentUser.firstName,
          lastName: this.props.currentUser.lastName,
          email: this.props.currentUser.email,
          password: this.props.currentUser.password,
          address: this.props.currentUser.address,
          phoneNumber: this.props.currentUser.phoneNumber,
          gender: this.props.currentUser.gender,
          image: imageBase64,
          roleId: this.props.currentUser.roleId,
          positionId: this.props.currentUser.positionId,
        },
        editMode: true,
        imgUrl: imageBase64,
      });
    }
  }

  componentDidMount = () => {
    this.props.getGenderStart();
    this.props.getRoles();
    this.props.getPositions();
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
        user: {
          ...this.state.user,
          [name]: base64,
        },
      });
    }
  };

  openPreviewImage = () => {
    this.setState({
      ...this.state,
      isOpen: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };

  validate = () => {
    let isValid = true;
    const arrCheck = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "phoneNumber",
      "gender",
      "roleId",
      "positionId",
    ];
    const arrEmptyFields = [];
    for (const item of arrCheck) {
      if (!this.state.user[item]) {
        isValid = false;
        arrEmptyFields.push(item);
      }
    }
    return { isValid, arrEmptyFields };
  };

  handleSubmit = async () => {
    if (this.validate().isValid) {
      const msg = await addNewUserService(this.state.user);
      alert("Created a new user successfully");
      this.setState({
        user: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          address: "",
          phoneNumber: "",
          gender: "",
          image: "",
          roleId: "",
          positionId: "",
        },
        imgUrl: "",
      });
      this.props.getAllUsers();
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      alert(msg + " cannot be empty.");
    }
  };

  handleUpdate = async () => {
    if (this.validate().isValid) {
      console.log("click");
      const msg = await updateUserService(this.state.user);
      console.log(msg);
      if (msg && msg.data.errCode === 0) {
        alert("Updated a new user successfully");
        this.setState({
          user: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            phoneNumber: "",
            gender: "",
            image: "",
            roleId: "",
            positionId: "",
          },
          editMode: false,
          imgUrl: "",
        });
        this.props.getAllUsers();
      }
    } else {
      const msg = this.validate().arrEmptyFields.join(", ");
      alert(msg + " cannot be empty.");
    }
  };

  render() {
    return (
      <div className="user-redux-container">
        <div className="title mt-5">Learn React-Redux</div>
        <div className="container">
          <div className="user-redux-table my-5">
            <TableUser />
          </div>
        </div>
        <div className="user-redux-body mb-5">
          <div className="container">
            <div className="title my-5">Form</div>
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.user.email}
                  onChange={this.handleChange}
                  disabled={this.state.editMode}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={this.state.user.password}
                  onChange={this.handleChange}
                  disabled={this.state.editMode}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.firstName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={this.state.user.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.lastName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  id="lastName"
                  value={this.state.user.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="address" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Da nang"
                  value={this.state.user.address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phoneNumber" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.phoneNumber" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="0123456789"
                  value={this.state.user.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="roleId" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  id="roleId"
                  name="roleId"
                  className="form-select"
                  onChange={this.handleChange}
                  value={this.state.user.roleId}
                >
                  <option value="" disabled>
                    --- Chọn vai trò ---
                  </option>
                  {this.state.roles.map((item) => {
                    return (
                      <option
                        selected={item.keyMap === this.state.user.roleId}
                        value={item.keyMap}
                        key={item.id}
                      >
                        {item.valueVi}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="gender" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  onChange={this.handleChange}
                  value={this.state.user.gender}
                >
                  <option value="" disabled>
                    --- Chọn giới tính ---
                  </option>
                  {this.state.genders.map((item) => {
                    return (
                      <option
                        selected={item.keyMap === this.state.user.gender}
                        value={item.keyMap}
                        key={item.id}
                      >
                        {item.valueVi}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="positionId" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="positionId"
                  name="positionId"
                  className="form-select"
                  onChange={this.handleChange}
                  value={this.state.user.positionId}
                >
                  <option value="" disabled>
                    --- Chọn chức danh ---
                  </option>
                  {this.state.positions.map((item) => {
                    return (
                      <option
                        selected={item.keyMap === this.state.user.positionId}
                        value={item.keyMap}
                        key={item.id}
                      >
                        {item.valueVi}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  hidden
                  onChange={this.handleUploadImage}
                />
                <label className="btn btn-secondary d-block" htmlFor="image">
                  <i class="fa-solid fa-upload"></i>
                  <span className="ms-3">Upload image</span>
                </label>
              </div>
              <div className="col-md-3">
                <div className="preview-image">
                  {this.state.imgUrl && (
                    <img
                      src={this.state.imgUrl}
                      style={{
                        width: "150px",
                        height: "150px",
                        cursor: "pointer",
                      }}
                      className="d-block img-thumbnail"
                      onClick={() => {
                        this.openPreviewImage();
                      }}
                    />
                  )}
                  {this.state.isOpen && (
                    <Lightbox
                      mainSrc={this.state.imgUrl}
                      onCloseRequest={() => {
                        this.setState({
                          ...this.state,
                          isOpen: false,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="col-12 mt-5">
                {this.state.editMode ? (
                  <button
                    onClick={this.handleUpdate}
                    type="button"
                    className="btn btn-success px-3"
                  >
                    Save changes
                  </button>
                ) : (
                  <button
                    onClick={this.handleSubmit}
                    type="button"
                    className="btn btn-primary px-3"
                  >
                    <FormattedMessage id="manage-user.addButton" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// value
// value select = value option => select this option

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
    currentUser: state.admin.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoles: () => dispatch(actions.getRolesAction()),
    getPositions: () => dispatch(actions.getPositionAction()),
    getAllUsers: () => dispatch(actions.getAllUsersAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
