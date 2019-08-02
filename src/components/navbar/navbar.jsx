import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import logo from "./jamg.svg";
import {
  profile,
  login,
  registerNav,
  forumNav
} from "../../store/actions/navActions";
class Nav extends Component {
  state = {};
  logout = () => {
    this.props.logout();
  };

  render() {
    const { auth, nav } = this.props;
    const loginClass = nav.login
      ? "nav-link active text-info"
      : "nav-link text-dark";
    const regClass = nav.register
      ? "nav-link active text-info"
      : "nav-link text-dark";
    const profileClass = nav.profile
      ? "nav-link text-info active"
      : "nav-link text-dark";
    const dashClass = nav.dashboard
      ? "nav-link text-info active"
      : "nav-link text-dark";
    const forumClass = nav.forum
      ? "nav-link text-info active"
      : "nav-link text-dark";

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand d-none d-sm-block abel-header text-info">
            JAMG.ML
          </div>
          <div className="navbar-brand  d-none d-block d-sm-none">
            <img
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
              alt=""
            />
          </div>
          <ul className="nav nav-tabs">
            {auth.uid ? (
              <div>
                <li className="nav-item">
                  <Link
                    to=""
                    className={dashClass}
                    onClick={this.props.dashboard}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/forum"
                    className={forumClass}
                    onClick={this.props.forum}
                  >
                    Mini-Forum
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className={profileClass}
                    onClick={this.props.profile}
                  >
                    Edit Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    onClick={this.logout}
                    className="nav-link text-dark"
                  >
                    <i className="fas fa-sign-out-alt" title="Logout" />
                  </Link>
                </li>
              </div>
            ) : (
              <div>
                <li className="nav-item">
                  <Link
                    className={loginClass}
                    to="/login"
                    onClick={this.props.login}
                  >
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={regClass}
                    to="/registration"
                    onClick={this.props.register}
                  >
                    REGISTER
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    nav: state.nav
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    profile: () => dispatch(profile()),
    login: () => dispatch(login()),
    register: () => dispatch(registerNav()),
    forum: () => dispatch(forumNav())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
