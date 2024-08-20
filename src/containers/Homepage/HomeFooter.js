import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "../../assets/images/logo.png";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div>
          <img src={logo} />
        </div>
        <p className="p-0 m-0">
          &copy; 2024 Booking-care cloned by{" "}
          <b>
            <a href="#">TPT</a>
          </b>
        </p>
      </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
