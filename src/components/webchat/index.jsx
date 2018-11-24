import React, { Component } from "react";
import { newMessage, getMessageSize } from "../../store/actions/webchatActions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import { Messages, Pinned } from "./messages";
class WebChat extends Component {
  state = {
    message: "",
    firstName: null,
    avatar: this.props.fb.auth.photoURL,
    loadLimit: null,
    LoadingChatHidden: true,
    chatbox: false
  };

  onMessageChange = e => {
    this.setState({
      message: e.target.value,
      firstName: this.props.fb.profile.firstName
    });
  };

  componentDidUpdate() {
    if (this.state.loadLimit === null) {
      setTimeout(e => {
        this.setState({
          loadLimit: this.props.countWebchat.chatSize
        });
      }, 500);
    }
    var el = this.refs.wrap;
    if (this.state.loadLimit === this.props.countWebchat.chatSize) {
      el.scrollTop = el.scrollHeight;
    } else if (this.state.loadLimit <= 0) {
      el.scrollTop = 0;
    } else if (this.state.loadLimit < this.props.countWebchat.chatSize) {
      el.scrollTop = el.scrollHeight / 10;
    }
  }
  openChatbox = () => {
    this.setState({
      chatbox: true
    });
  };
  componentDidMount() {
    this.props.getMessageSize();
  }

  scrollHandler = e => {
    var el = this.refs.wrap;
    if (el.scrollTop === 0) {
      setTimeout(e => {
        this.setState({
          loadLimit: this.state.loadLimit - 10
        });
      }, 1000);
    }
  };

  onSubmitMessage = e => {
    e.preventDefault();
    this.setState({
      message: ""
    });
    this.props.newMessage(this.state);
  };
  render() {
    const { webchat, pinned } = this.props;
    if (!this.state.chatbox) {
      return (
        <div className="card">
          <h5 className="card-titles text-dark m-3">Chatbox</h5>
          <div
            className="card-body chat border-top"
            ref="wrap"
            onScroll={this.scrollHandler}
          >
            <button
              type="button"
              onClick={this.openChatbox}
              className="btn btn-primary"
            >
              Open Chatbox
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <h5 className="card-titles text-dark m-3">Chatbox (BETA)</h5>
        <div
          className="card-body chat border-top"
          ref="wrap"
          onScroll={this.scrollHandler}
        >
          <ul className="list-unstyled">
            {!webchat ? null : this.state.loadLimit <= 0 ? null : (
              <li className="text-center mb-3">Loading . . .</li>
            )}
            {webchat &&
              webchat.map((res, index) => {
                if (index >= this.state.loadLimit - 10) {
                  return (
                    <li key={res.id}>
                      <Messages
                        avatar={res.avatar}
                        user={res.user}
                        message={res.message}
                        date={moment(res.date.toDate()).calendar()}
                      />
                    </li>
                  );
                } else {
                  return null;
                }
              })}
          </ul>
          <ul className="list-unstyled">
            {pinned &&
              pinned.map(res => {
                return (
                  <li key={res.id}>
                    <Pinned
                      name={res.name}
                      date={moment(res.date.toDate()).calendar()}
                      message={res.message}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="card-footer">
          <form onSubmit={this.onSubmitMessage}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onChange={this.onMessageChange.bind(this)}
                placeholder="Type your message. . ."
                value={this.state.message}
                required
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  <i className="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    webchat: state.firestore.ordered.webchat,
    fb: state.firebase,
    newMsg: state.webchat.newMsg,
    pinned: state.firestore.ordered.pinned,
    countWebchat: state.webchat
  };
};
const mapDispatchToProps = dispatch => {
  return {
    newMessage: query => dispatch(newMessage(query)),
    getMessageSize: () => dispatch(getMessageSize())
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "webchat",
      orderBy: ["date", "asc"]
    },
    { collection: "pinned" }
  ])
)(WebChat);
