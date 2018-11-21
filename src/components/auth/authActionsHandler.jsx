import React, { Component } from "react";
import { connect } from "react-redux";
import "firebase/firestore";
import "firebase/auth";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import { MyModal, MyModalForgotPw } from "../../functions/modal";
import {
  newPassword,
  verifyingEmail,
  handleResetPassword
} from "../../store/actions/authActions";

class authActions extends Component {
  state = {
    newPassword: "",
    actionCode: "",
    button: false,
    isModalOpens: true,
    redirect: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      button: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      button: true,
      isModalOpen: false
    });
    this.props.newPassword(this.state);
  };

  //sending email to user to verify email
  handleVerifyEmail = () => {
    this.props.verifyEmail(this.state);
  };

  handleResetPassword = () => {
    this.props.resetPassword(this.state);
  };

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    this.setState({
      actionCode: values.oobCode
    });
  }
  verifyToken = () => {
    this.setState({
      isModalOpens: false
    });
    const values = queryString.parse(this.props.location.search);
    switch (values.mode) {
      case "resetPassword":
        this.handleResetPassword();
        break;
      case "recoverEmail":
        window.location = "/";
        break;
      case "verifyEmail":
        this.handleVerifyEmail();
        break;
      default:
        window.location = "/";
        break;
    }
  };
  errorHandler = () => {
    this.setState({
      isModalOpens: false,
      errorModal: true
    });
  };
  home = () => {
    window.location = "/";
  };
  errorModal() {
    return (
      <MyModal
        isOpen={this.props.layout.verifyError}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        content="Failed to Verify"
        onClick={this.home}
        disabled={this.state.button}
        subtitle={subtitle => (this.subtitle = subtitle)}
        buttonName="OK"
        buttonClass="btn btn-danger"
      />
    );
  }
  successModal() {
    return (
      <MyModal
        isOpen={this.props.layout.verifySuccess}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        content="Verification Success!"
        onClick={this.home}
        disabled={this.state.button}
        subtitle={subtitle => (this.subtitle = subtitle)}
        buttonName="OK"
        buttonClass="btn btn-success"
      />
    );
  }
  successModalPw() {
    return (
      <MyModal
        isOpen={this.props.layout.passwordChanged}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        content="Password Changed!"
        onClick={this.home}
        subtitle={subtitle => (this.subtitle = subtitle)}
        buttonName="OK"
        buttonClass="btn btn-success"
      />
    );
  }
  modal() {
    return (
      <MyModal
        isOpen={this.state.isModalOpens}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Reset Password"
        content="Click next to verify."
        onClick={this.verifyToken}
        disabled={this.state.button}
        subtitle={subtitle => (this.subtitle = subtitle)}
        buttonName="Next"
        buttonClass="btn btn-info"
      />
    );
  }
  resetPw() {
    return (
      <MyModalForgotPw
        isOpen={this.props.layout.changePassword}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        subtitle={subtitle => (this.subtitle = subtitle)}
        contentLabel="Reset Password"
        content="Enter New Password"
        disabled={this.state.button}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
      />
    );
  }
  render() {
    document.title = "Auth | JamgPH";
    const values = queryString.parse(this.props.location.search);
    if (!values.oobCode) return <Redirect to="/" />;
    return (
      <div>
        {this.modal()}
        {this.errorModal()}
        {this.successModal()}
        {this.resetPw()}
        {this.successModalPw()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    layout: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    newPassword: creds => dispatch(newPassword(creds)),
    verifyEmail: creds => dispatch(verifyingEmail(creds)),
    resetPassword: creds => dispatch(handleResetPassword(creds))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(authActions);
