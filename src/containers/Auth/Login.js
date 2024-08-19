import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginService } from "../../services/userService";
// import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      passwordType: "password",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleLogin = async (username, password) => {
    const result = await handleLoginService(username, password);
    this.props.userLoginSuccess(result.data);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.username && !this.state.password) {
      alert("Vui long nhap username va password");
      return;
    } else if (!this.state.username) {
      alert("Vui long nhap username");
      return;
    } else if (!this.state.password) {
      alert("Vui long nhap password");
      return;
    }
    this.handleLogin(this.state.username, this.state.password);
  };

  handleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
      passwordType: this.state.showPassword ? "text" : "password",
    });
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <form onSubmit={this.handleSubmit} class="login-content row">
            <div className="col-12 text-center mb-4">
              <h3 className="fw-bold">Login</h3>
            </div>
            <div className="col-12 form-group mb-3">
              <label for="username" className="mb-2 fw-bold">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                placeholder="Username"
                class="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 password-input form-group mb-3">
              <label for="password" className="mb-2 fw-bold">
                Password
              </label>
              <input
                type={this.state.passwordType}
                name="password"
                id="password"
                placeholder="Password"
                class="form-control"
                onChange={this.handleChange}
              />
              <span className="showPassword" onClick={this.handleShowPassword}>
                {this.state.showPassword ? (
                  <i class="fa-solid fa-eye"></i>
                ) : (
                  <i class="fa-solid fa-eye-low-vision"></i>
                )}
              </span>
            </div>
            <div className="col-12 mb-3 d-flex justify-content-end login-forgot">
              <a href="#">?? Forgot password</a>
            </div>
            <div className="col-12 my-2">
              <button type="submit" className="btn btn-primary w-100 login-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
