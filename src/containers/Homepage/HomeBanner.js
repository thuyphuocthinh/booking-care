import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { changeLanguageAppAction } from "../../store/actions";

class HomeBanner extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguage(language);
  };

  render() {
    return (
      <Fragment>
        <div className="home-header-banner">
          <div className="background-blur"></div>
          <div className="content-above">
            <div className="banner-title-1">
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="banner-title-2">
              <FormattedMessage id="banner.title2" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa" />
            </div>
          </div>
          <div className="content-below">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.option1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.option2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-procedures"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.option3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-microscope"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.option4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.option5" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-tooth"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="banner.option6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.user.isLoggedin,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(changeLanguageAppAction(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
