import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Header from "../Header/Header";
import HomeHeader from "../Homepage/HomeHeader";
import HomeFooter from "../Homepage/HomeFooter";
import { verifyBookingService } from "../../services/bookingService";

class VerifyBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  componentDidMount = () => {
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      this.confirm(token, doctorId);
    }
  };

  confirm = async (token, doctorId) => {
    try {
      const resp = await verifyBookingService(token, doctorId);
      if (resp.status === 200 && resp.data.errCode === 0) {
        this.setState({
          success: true,
        });
      }
      if (resp.status === 200 && resp.data.errCode === -1) {
        this.setState({
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <HomeHeader />
        <div style={{ height: "72vh", marginTop: "50px" }}>
          {this.state.success ? (
            <p
              className="text-center"
              style={{ color: "red", fontSize: "18px" }}
            >
              Xác nhận lịch khám thành công
            </p>
          ) : (
            <p
              className="text-center"
              style={{ color: "red", fontSize: "18px" }}
            >
              Lịch hẹn không tồn tại hoặc đã được xác nhận
            </p>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
