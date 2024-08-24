import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import * as doctorService from "../../../services/doctorService";
import { languages } from "../../../utils/constant";
import NumberFormat from "react-number-format";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPriceDetail: false,
      doctorExtraInfo: {},
    };
  }

  componentDidMount = async () => {
    try {
      const { doctorId } = this.props;
      const resp = await doctorService.getExtraInfoDoctorService(doctorId);
      if (resp.status === 200 && resp.data.errCode === 0) {
        this.setState({
          doctorExtraInfo: resp.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderPrice = () => {
    const price =
      this.props.language === languages.VI
        ? this.state.doctorExtraInfo.priceType?.valueVi
        : this.state.doctorExtraInfo.priceType?.valueEn;
    return price;
  };

  render() {
    return (
      <div className="doctor-extra-container">
        <div className="row">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header fw-bold">Địa chỉ phòng khám</div>
              <div className="card-body">
                <p className="mb-2 p-0">
                  {this.state.doctorExtraInfo.nameClinic &&
                    this.state.doctorExtraInfo.nameClinic}
                </p>
                <p className="mb-2 p-0">
                  {this.state.doctorExtraInfo.addressClinic &&
                    this.state.doctorExtraInfo.addressClinic}
                </p>
                <i className="m-0 p-0">
                  {this.state.doctorExtraInfo.note &&
                    this.state.doctorExtraInfo.note}
                </i>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card">
              <div className="card-header fw-bold">Giá khám</div>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="p-0 m-0">
                    <NumberFormat
                      value={this.renderPrice()}
                      displayType="text"
                      thousandSeparator={true}
                      suffix={
                        this.props.language === languages.VI ? "VND" : "$"
                      }
                    />
                  </p>
                  {!this.state.showPriceDetail && (
                    <button
                      onClick={() => {
                        this.setState({
                          showPriceDetail: true,
                        });
                      }}
                      className="btn btn-secondary px-2"
                    >
                      Xem chi tiết
                    </button>
                  )}
                </div>
                {this.state.showPriceDetail && (
                  <>
                    <p className="p-0 my-3">
                      <i>
                        Người bệnh có thể thanh toán chi phí bằng hình thức đặt
                        qua bookingcare, với người nước ngoài thì giá sẽ là
                        250.000 VNĐ.
                      </i>
                    </p>
                    <button
                      onClick={() => {
                        this.setState({
                          showPriceDetail: false,
                        });
                      }}
                      className="btn btn-secondary px-2"
                    >
                      Ẩn chi tiết
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
