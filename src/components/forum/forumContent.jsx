import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { forumNav } from "../../store/actions/navActions";
import { NormalPost, PinnedPost, Replies } from "./forumContentHandler";
import { reply } from "../../store/actions/forumActions";
import moment from "moment";
class ForumContent extends Component {
  state = {
    reply: "",
    photoURL: null,
    name: null,
    disabled: true,
    forumid: null,
    hiddenReply: true
  };
  componentWillMount() {
    this.setState({
      forumid: this.props.forumid
    });
  }

  componentDidMount() {
    this.props.forumNav();
  }
  replyOnChange = e => {
    this.setState({
      reply: e.target.value,
      photoURL: this.props.auth.photoURL,
      name: this.props.profile.firstName,
      forumid: this.props.forumid,
      disabled: false
    });
  };
  replyOnSubmit = e => {
    e.preventDefault();
    this.setState({
      disabled: true,
      reply: ""
    });
    this.props.reply(this.state);
  };
  render() {
    const { topic, auth, pinnedTopic, replyList } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (topic) {
      document.title = this.props.topic.title + " | jamgph";
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h5 className="card-titles text-dark m-3">
                  {topic.title}
                  <hr />
                </h5>
                <div className="card-body">
                  <div className="container">
                    <NormalPost
                      title={topic.title}
                      avatar={topic.avatar}
                      author={topic.author}
                      message={topic.message}
                    />
                    <small className="float-right text-muted">
                      Posted: {moment(topic.date.toDate()).calendar()}
                    </small>
                  </div>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="container">
                    {replyList &&
                      replyList.map(r => {
                        return r.id === this.state.forumid ? (
                          r.replies.map(res => {
                            return (
                              <div key={res.id}>
                                <Replies
                                  avatar={res.avatar}
                                  author={res.name}
                                  message={res.reply}
                                  date={
                                    res.date &&
                                    moment(res.date.toDate()).calendar()
                                  }
                                />
                              </div>
                            );
                          })
                        ) : (
                          <div key={r.id}>
                            <Replies
                              avatar={r.avatar}
                              author={r.name}
                              message={r.reply}
                              date={
                                r.date && moment(r.date.toDate()).calendar()
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              Submit Reply
              <form onSubmit={this.replyOnSubmit}>
                <textarea
                  value={this.state.reply}
                  onChange={this.replyOnChange}
                  className="form-control col-md-6 mb-3"
                  rows="5"
                />
                <button
                  disabled={this.state.disabled}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else if (pinnedTopic) {
      document.title = this.props.pinnedTopic.title + " | jamgph";
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h5 className="card-titles text-dark m-3">
                  {pinnedTopic.title}
                  <hr />
                </h5>
                <div className="card-body">
                  <div className="container">
                    <PinnedPost
                      title={pinnedTopic.title}
                      avatar={pinnedTopic.avatar}
                      author={pinnedTopic.author}
                      message={pinnedTopic.message}
                    />
                    <small className="float-right text-muted">
                      Posted: {moment(pinnedTopic.date.toDate()).calendar()}
                    </small>
                  </div>
                </div>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="container">
                    {replyList &&
                      replyList.map(r => {
                        return r.id === this.state.forumid ? (
                          r.replies.map(res => {
                            return (
                              <div key={res.id}>
                                <Replies
                                  avatar={res.avatar}
                                  author={res.name}
                                  message={res.reply}
                                  date={
                                    res.date &&
                                    moment(res.date.toDate()).calendar()
                                  }
                                />
                              </div>
                            );
                          })
                        ) : (
                          <div key={r.id}>
                            <Replies
                              avatar={r.avatar}
                              author={r.name}
                              message={r.reply}
                              date={
                                r.date && moment(r.date.toDate()).calendar()
                              }
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              Submit Reply
              <form onSubmit={this.replyOnSubmit}>
                <textarea
                  value={this.state.reply}
                  onChange={this.replyOnChange}
                  className="form-control col-md-6 mb-3"
                  rows="5"
                />
                <button
                  disabled={this.state.disabled}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const topics = state.firestore.data.Forum;
  const pinnedTopics = state.firestore.data.PinnedForum;
  const topic = topics ? topics[id] : null;
  const pinnedTopic = pinnedTopics ? pinnedTopics[id] : null;
  return {
    forumid: ownProps.match.params.id,
    topic: topic,
    pinnedTopic: pinnedTopic,
    replyList: state.firestore.ordered.replies,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    forumNav: () => dispatch(forumNav()),
    reply: data => dispatch(reply(data))
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => [
    {
      collection: "Forum",
      orderBy: ["date", "desc"]
    },
    {
      collection: "PinnedForum",
      orderBy: ["date", "desc"]
    },
    {
      collection: "replies",
      doc: props.match.params.id,
      subcollections: [
        {
          collection: "replies",
          orderBy: ["date", "asc"]
        }
      ]
    }
  ])
)(ForumContent);
