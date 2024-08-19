import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addNewUserService } from "../../services/userService";

export default class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      },
    };
  }

  handleClearDataInput = () => {
    this.setState({
      userInfo: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      },
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      {
        userInfo: {
          ...this.state.userInfo,
          [name]: value,
        },
      },
      () => {
        console.log(this.state.userInfo);
      }
    );
  };

  handleSubmit = async () => {
    // validate here
    // call API
    const msg = await addNewUserService(this.state.userInfo);
    this.props.close();
    if (msg) {
      alert("Added a new user successfully");
      this.props.getAllUsers();
    } 
    // close modal
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          toggle={this.props.close}
          {...this.props}
        >
          <ModalHeader toggle={this.props.close}>Modal title</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row mb-2">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.userInfo.email}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.userInfo.password}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="firstName">Firstname</label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={this.state.userInfo.firstName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="lastName">Lastname</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={this.state.userInfo.lastName}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      className="form-control"
                      type="text"
                      name="address"
                      id="address"
                      value={this.state.userInfo.address}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      className="form-control"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={this.state.userInfo.phoneNumber}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="px-2"
              color="primary"
              onClick={this.handleSubmit}
            >
              Add new
            </Button>{" "}
            <Button
              className="px-2"
              color="secondary"
              onClick={this.props.close}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
