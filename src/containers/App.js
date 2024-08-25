import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
// import Login from '../routes/Login';
import Login from "../containers/Auth/Login";
import Header from "./Header/Header";
import System from "../routes/System";

import { CustomToastCloseButton } from "../components/CustomToast";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./Homepage/HomePage";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailDoctor from "./Patient/Doctor/DetailDoctor";
import Doctor from "../routes/Doctor";
import VerifyBooking from "./Patient/VerifyBooking";
import DetailSpecialty from "./Patient/Specialty/DetailSpecialty";
import DetailClinic from "./Patient/Clinic/DetailClinic";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            {this.props.isLoggedIn && <Header />}

            <span className="content-container">
              <Switch>
                <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                  <Route path={path.HOME} exact component={Home} />
                  <Route
                    path={"/doctor"}
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route
                    path={"/doctorDetail/:id"}
                    exact
                    component={DetailDoctor}
                  />
                  <Route
                    path={path.DETAIL_SPECIALTY}
                    // exact
                    component={DetailSpecialty}
                  />
                  <Route
                    path={path.DETAIL_CLINIC}
                    // exact
                    component={DetailClinic}
                  />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyBooking}
                  />
                </CustomScrollbars>
              </Switch>
            </span>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              rtl={true}
              hideProgressBar={false}
              pauseOnHover={true}
              pauseOnFocusLoss={true}
              closeOnClick={true}
              draggable={true}
              style={{ width: "fit-content" }}
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    // isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
