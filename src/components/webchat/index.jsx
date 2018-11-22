import React, { Component } from "react";
import { newMessage } from "../../store/actions/webchatActions";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { Messages, Pinned } from "./messages";
class WebChat extends Component {
  state = {
    message: "",
    firstName: null,
    avatar: this.props.fb.auth.photoURL,
    limit: 50
  };
  onMessageChange = e => {
    this.setState({
      message: e.target.value,
      firstName: this.props.fb.profile.firstName
    });
  };
  componentDidUpdate() {
    var el = this.refs.wrap;
    if (this.state.limit < 50) {
      el.scrollTop = el.scrollHeight / 10;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }
  chatLoaded = () => {
    var el = this.refs.wrap;
    el.scrollTop = el.scrollHeight;
  };
  showMore = () => {
    var el = this.refs.wrap;
    el.scrollTop = el.scrollHeight;
    this.setState({ limit: this.state.limit - 20 });
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
    return (
      <div className="card">
        <h5 className="card-titles text-dark m-3">Chatbox (BETA)</h5>
        <div className="card-body chat border-top" ref="wrap">
          <ul className="list-unstyled">
            {!webchat ? null : this.state.limit <= 0 ? null : (
              <li className="text-center mb-3">
                <Link to="" className="text-center" onClick={this.showMore}>
                  show more...
                </Link>
              </li>
            )}
            {webchat &&
              webchat.map((res, index) => {
                if (index >= this.state.limit) {
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
    pinned: state.firestore.ordered.pinned
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
  firestoreConnect([
    {
      collection: "webchat",
      orderBy: ["date", "asc"]
    },
    { collection: "pinned" }
  ])
)(WebChat);
