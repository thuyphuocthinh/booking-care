import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";

class HomePage extends Component {
  render() {
    return <div>
        <HomeHeader />
        {/* Homepage */}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
