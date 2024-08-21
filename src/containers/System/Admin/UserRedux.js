import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCodeService } from "../../../services/allCodeService";
import * as actions from "../../../store/actions/adminActions";

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
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        ...this.state,
        genders: this.props.genders,
      });
    }
  }

  componentDidMount = () => {
    this.props.getGenderStart();
  };

  render() {
    const { genders } = this.props;
    return (
      <div className="user-redux-container">
        <div className="title mt-5 mb-4">Learn React-Redux</div>
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
              <div className="col-md-3">
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
              <div className="col-md-3">
                <label htmlFor="gender" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select id="gender" name="gender" className="form-select">
                  <option selected disabled>
                    --- Chọn giới tính ---
                  </option>
                  {genders.map((item) => {
                    return (
                      <option value={item.key} key={item.id}>
                        {item.valueVi}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="positionId" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  id="positionId"
                  name="positionId"
                  className="form-select"
                >
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="image" className="form-label fw-bold">
                  <FormattedMessage id="manage-user.image" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="image"
                />
              </div>
              <div className="col-12">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
