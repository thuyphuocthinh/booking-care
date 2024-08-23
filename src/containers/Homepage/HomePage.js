import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Sections/Specialty";
import MedicalFacility from "./Sections/MedicalFacility";
import "./HomePage.scss";
import Doctor from "./Sections/Doctor";
import HandBook from "./Sections/HandBook";
import About from "./Sections/About";
import HomeFooter from "./HomeFooter";
import HomeBanner from "./HomeBanner";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <HomeBanner />
        <Specialty />
        <MedicalFacility />
        <Doctor />
        <HandBook />
        <About/>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
