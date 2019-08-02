import React, { Component } from "react";
import { connect } from "react-redux";
import {
  login,
  authButton,
  forgotPassword
} from "../../store/actions/authActions";
import { Redirect, Link } from "react-router-dom";
import { home } from "../../store/actions/layoutActions";
import Modal from "react-modal";
import { GroupTextHandler } from "../../functions/groupTextHandler";
// import Quotes from "../api/quotes";
class Login extends Component {
  componentDidMount() {
    document.title = "Login | jamg.ml";
  }

  state = {
    email: "",
    password: "",
    forgotEmail: "",
    isModalOpen: false,
    button: false
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
      button: false
    });
  };
  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      button: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.home();
    this.props.loginButton();
    this.props.login(this.state);
  };
  handleForgotSubmit = e => {
    e.preventDefault();
    this.setState({
      button: true
    });
    this.props.forgot(this.state.forgotEmail);
  };
  render() {
    const customStyles = {
      content: {
        top: "30%",
        left: "50%",
        right: "auto",
        width: "300px",
        bottom: "auto",
        paddingRight: "20px",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      }
    };
    const { auth, logButton } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit} className="white">
                  <h3 className="mb-4 abel text-dark">Log in</h3>
                  <div className="input-group mb-3">
                    <GroupTextHandler className="fas fa-at text-dark" />
                    <input
                      className="validate form-control"
                      type="email"
                      id="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <GroupTextHandler className="fas fa-key text-dark" />
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      autoComplete="password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Link
                      to="/login"
                      className="forgot-pw text-info"
                      onClick={this.openModal}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="form-group mt-2">
                    <button
                      className="btn btn-dark"
                      disabled={!logButton}
                      style={!logButton ? { cursor: "no-drop" } : null}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <Modal
                  isOpen={this.state.isModalOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  shouldCloseOnOverlayClick={false}
                  style={customStyles}
                  ariaHideApp={false}
                  contentLabel="Forgot Password"
                >
                  <h3
                    className="mb-4 abel"
                    ref={subtitle => (this.subtitle = subtitle)}
                  >
                    Forgot Password
                  </h3>
                  <form onSubmit={this.handleForgotSubmit}>
                    <input
                      className="form-control mb-4"
                      type="email"
                      onChange={this.handleChange}
                      id="forgotEmail"
                      placeholder="youremail@example.com"
                      required
                    />
                    <button
                      type="submit"
                      className="btn btn-dark"
                      disabled={this.state.button}
                      style={this.state.button ? { cursor: "no-drop" } : null}
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-dark m-2"
                      onClick={this.closeModal}
                    >
                      Close
                    </button>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            {/* <div className="card">
              <div className="card-body dash-note">
                Login Content starts here
                <Quotes />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    logButton: state.auth.authButton
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: creds => dispatch(login(creds)),
    home: () => dispatch(home()),
    loginButton: () => dispatch(authButton()),
    forgot: email => dispatch(forgotPassword(email))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
