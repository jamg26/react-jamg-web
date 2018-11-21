import React, { Component } from "react";
import { newMessage } from "../../store/actions/webchatActions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { ToastStore } from "react-toasts";
import moment from "moment";
import Linkify from "react-linkify";
class WebChat extends Component {
  state = {
    message: "",
    firstName: null,
    avatar: this.props.fb.auth.photoURL
  };
  onMessageChange = e => {
    this.setState({
      message: e.target.value,
      firstName: this.props.fb.profile.firstName
    });
  };
  componentDidUpdate() {
    var el = this.refs.wrap;
    el.scrollTop = el.scrollHeight;
  }
  onSubmitMessage = e => {
    e.preventDefault();
    this.setState({
      message: ""
    });
    if (this.state.message === "") {
      ToastStore.error("Cannot ba empty");
    } else {
      this.props.newMessage(this.state);
    }
  };
  render() {
    const { webchat } = this.props;
    return (
      <div className="card">
        <div className="card-body chat" ref="wrap">
          <ul className="list-unstyled">
            {webchat &&
              webchat.map(res => {
                return (
                  <li key={res.id}>
                    {!res.avatar ? (
                      res.user + ":"
                    ) : (
                      <img
                        className="sender rounded-circle"
                        src={res.avatar}
                        alt={res.user}
                        title={res.user}
                      />
                    )}
                    <span className="ml-3">
                      <Linkify properties={{ target: "_blank" }}>
                        {res.message}
                      </Linkify>
                    </span>
                    <br />
                    <small>{moment(res.date.toDate()).calendar()}</small>
                    <hr />
                  </li>
                );
              })}
          </ul>
        </div>
        <form onSubmit={this.onSubmitMessage}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onChange={this.onMessageChange.bind(this)}
              placeholder="Type your message"
              value={this.state.message}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="submit">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    webchat: state.firestore.ordered.webchat,
    fb: state.firebase,
    newMsg: state.webchat.newMsg
  };
};
const mapDispatchToProps = dispatch => {
  return {
    newMessage: query => dispatch(newMessage(query))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "webchat", orderBy: ["date", "asc"] }])
)(WebChat);
