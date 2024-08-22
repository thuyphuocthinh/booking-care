import React, { Component } from "react";
import "../UserManage.scss";
import { connect } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
  getCurrentUserAction,
} from "../../../store/actions/adminActions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableUser extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users,
      });
    }
  };

  componentDidMount = () => {
    // call API => get data
    this.props.getAllUsers();
  };

  componentWillUnmount() {
    // before kill the component
  }

  render() {
    return (
      <>
        <div className="text-center p-3">
          <div>
            <table id="customers" className="text-center">
              <tr>
                <th className="text-center">Email</th>
                <th className="text-center">Firstname</th>
                <th className="text-center">Lastname</th>
                <th className="text-center">Actions</th>
              </tr>
              {this.state.users
                .slice(this.state.users.length - 10)
                .map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>
                        <button
                          className="btn btn-primary px-2 me-2"
                          onClick={() => {
                            this.props.getCurrentUser(item.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger px-2"
                          onClick={() => {
                            this.props.deleteUser(item.id);
                            alert("Deleted successfully");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
          <MdEditor
            style={{ height: "500px", marginTop: "40px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsersAction()),
    getCurrentUser: (userId) => dispatch(getCurrentUserAction(userId)),
    deleteUser: (userId) => dispatch(deleteUserAction(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
