import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions/adminActions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount = () => {
    this.props.getGenderStart();
    this.props.getRoles();
    this.props.getPositions();
  };

  handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      this.setState({
        ...this.state,
        imgUrl: url,
      });
    }
  };

  openPreviewImage = () => {
    this.setState({
      ...this.state,
      isOpen: true,
    });
  };

  render() {
    return (
      <div className="user-redux-container">
        <div className="title my-5">Learn React-Redux</div>
        <div className="user-redux-body">
          <div className="container">
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
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="roleId" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select id="roleId" name="roleId" className="form-select">
                  <option selected disabled>
                    --- Chọn vai trò ---
                  </option>
                  {this.state.roles.map((item) => {
                    return (
                      <option value={item.key} key={item.id}>
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
                <select id="gender" name="gender" className="form-select">
                  <option selected disabled>
                    --- Chọn giới tính ---
                  </option>
                  {this.state.genders.map((item) => {
                    return (
                      <option value={item.key} key={item.id}>
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
                >
                  <option selected disabled>
                    --- Chọn chức danh ---
                  </option>
                  {this.state.positions.map((item) => {
                    return (
                      <option value={item.key} key={item.id}>
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
                <button type="submit" className="btn btn-primary px-3">
                  <FormattedMessage id="manage-user.addButton" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
    roles: state.admin.roles,
    positions: state.admin.positions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoles: () => dispatch(actions.getRolesAction()),
    getPositions: () => dispatch(actions.getPositionAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
