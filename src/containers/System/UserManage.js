import React, { Component, createRef } from "react";
// import { FormattedMessage } from "react-intl";
import "./UserManage.scss";
import { connect } from "react-redux";
import { getAllUsersService } from "../../services/userService";
import Header from "../Header/Header";
import ModalUser from "./ModalUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], openModal: false };
    this.childRef = React.createRef();
  }

  getAllUsers = async () => {
    const result = await getAllUsersService();
    if (result.status === 200) {
      this.setState(
        {
          users: result.data.data,
        },
        () => {
          console.log(this.state.users);
        }
      );
    }
  };

  componentDidMount = () => {
    // call API => get data
    this.getAllUsers();
  };

  componentWillUnmount() {
    // before kill the component
  }

  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
    this.childRef.current.handleClearDataInput();
  };

  render() {
    return (
      <>
        <Header />
        <ModalUser
          ref={this.childRef}
          open={this.state.openModal}
          close={this.handleCloseModal}
          getAllUsers={this.getAllUsers}
        />
        <div className="text-center p-3">
          <h3 className="my-3 fw-bold">Manage users</h3>
          <div className="d-flex align-items-center justify-content-end my-3">
            <button
              className="px-3 btn btn-primary"
              onClick={() => {
                this.setState({
                  openModal: true,
                });
              }}
            >
              Add New User
            </button>
          </div>
          <div>
            <table id="customers" className="text-center">
              <tr>
                <th className="text-center">Email</th>
                <th className="text-center">Firstname</th>
                <th className="text-center">Lastname</th>
                <th className="text-center">Actions</th>
              </tr>
              {this.state.users.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>
                      <button className="btn btn-primary px-2 me-2">
                        Detail
                      </button>
                      <button className="btn btn-danger px-2">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
