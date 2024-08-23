import React, { Component } from "react";
import { connect } from "react-redux";
import { USER_ROLE, languages } from "../../utils";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import { FormattedMessage } from "react-intl";
import "./Header.scss";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  componentDidMount = () => {
    const { userInfo } = this.props;
    // _ => lodash => operates on obj
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      let menu;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
      this.setState({
        menuApp: menu,
      });
    }
  };

  render() {
    const { processLogout, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="right-side">
          {/* languages */}
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />,{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : "User"} !
          </span>

          <div className="language">
            <div
              className={`language-vi ${
                this.props.language === languages.VI ? "active" : ""
              }`}
            >
              <span onClick={() => this.changeLanguage(languages.VI)}>VN</span>
            </div>
            <div
              className={`language-en ${
                this.props.language === languages.EN ? "active" : ""
              }`}
            >
              <span onClick={() => this.changeLanguage(languages.EN)}>EN</span>
            </div>
          </div>

          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) =>
      dispatch(actions.changeLanguageAppAction(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
