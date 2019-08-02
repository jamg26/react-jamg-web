import React, { Component } from "react";
import { connect } from "react-redux";
import { register, authButton } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import { GroupTextHandler } from "../../functions/groupTextHandler";
import { registerNav } from "../../store/actions/navActions";
import Recaptcha from "react-recaptcha";
import { ToastStore } from "react-toasts";
class Register extends Component {
  componentDidMount() {
    document.title = "Register";
    this.props.registerNav();
  }
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    captcha: false
  };

  //recaptcha callbacks
  recaptchaCallback = resp => {
    if (resp) {
      this.setState({
        captcha: true
      });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.captcha) {
      this.props.registerButton();
      this.props.register(this.state);
    } else {
      ToastStore.error("Invalid Captcha!");
    }
  };
  render() {
    const { auth, regButton } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit} className="white">
                  <h3 className="mb-4 abel text-dark">Registration</h3>
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
                  <div className="input-group mb-3">
                    <GroupTextHandler className="fas fa-key text-dark" />
                    <input
                      className="validate form-control"
                      type="password"
                      id="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      autoComplete="password"
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <GroupTextHandler className="fas fa-user-alt text-dark" />
                    <input
                      className="validate form-control"
                      type="text"
                      placeholder="Firstname"
                      id="firstName"
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-4">
                    <GroupTextHandler className="fas fa-user-alt text-dark" />
                    <input
                      className="validate form-control"
                      type="text"
                      placeholder="Lastname"
                      id="lastName"
                      onChange={this.handleChange}
                      required
                    />
                  </div>

                  <Recaptcha
                    sitekey="6LdTdnwUAAAAAEv6HNCx2vSKCBBwQ3Ixz9sMPdAK"
                    render="explicit"
                    verifyCallback={this.recaptchaCallback}
                  />
                  <div className="form-group mt-2">
                    <button
                      className="btn btn-dark"
                      disabled={!regButton}
                      style={!regButton ? { cursor: "no-drop" } : null}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <div className="card">
              <div className="card-body dash-note">
                <p>Use unique information and secure your password</p>
                <p />
                <b>Is it safe to register ?</b>
                <ul>
                  <li>
                    <mark>https://</mark> your password will be encrypted and
                    private.
                  </li>
                  <li>Your information will be stored in the firebase.</li>
                  <li>
                    for more information -
                    <a href="https://firebase.google.com/support/privacy/">
                      https://firebase.google.com/support/privacy/
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    regButton: state.auth.authButton
  };
};
const mapDispatchToProps = dispatch => {
  return {
    register: newUser => dispatch(register(newUser)),
    registerButton: () => dispatch(authButton()),
    registerNav: () => dispatch(registerNav())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
