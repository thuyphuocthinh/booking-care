import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fa-solid fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>Chuyên khoa</b>
                </div>
                <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div className="sub-title">Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác sĩ</b>
                </div>
                <div className="sub-title">Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div className="sub-title">Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fa-solid fa-question"></i>
                <span className="ms-2">Hỗ trợ</span>
              </div>
              <div className="flag">VN</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="background-blur"></div>
          <div className="content-above">
            <div className="banner-title-1">NỀN TẢNG Y TẾ</div>
            <div className="banner-title-2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
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
                  Khám <br />
                  chuyên khoa
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <div className="text-child">
                  Khám <br /> từ xa
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-procedures"></i>
                </div>
                <div className="text-child">
                  Khám <br /> tổng quát
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-microscope"></i>
                </div>
                <div className="text-child">
                  Xét nghiệm <br /> y học
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-user-md"></i>
                </div>
                <div className="text-child">
                  Sức khỏe <br />
                  tinh thần
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-tooth"></i>
                </div>
                <div className="text-child">
                  Khám <br /> nha khoa
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
