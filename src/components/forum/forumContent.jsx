import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { forumNav } from "../../store/actions/navActions";
import { NormalPost, PinnedPost } from "./forumContentHandler";
class ForumContent extends Component {
  componentDidMount() {
    this.props.forumNav();
  }
  render() {
    const { topic, auth, pinnedTopic } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (topic) {
      document.title = this.props.topic.title + " | jamgph";
      return (
        <NormalPost
          title={topic.title}
          avatar={topic.avatar}
          author={topic.author}
          message={topic.message}
        />
      );
    } else if (pinnedTopic) {
      document.title = this.props.pinnedTopic.title + " | jamgph";
      return (
        <PinnedPost
          title={pinnedTopic.title}
          avatar={pinnedTopic.avatar}
          author={pinnedTopic.author}
          message={pinnedTopic.message}
        />
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
    topic: topic,
    pinnedTopic: pinnedTopic,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    forumNav: () => dispatch(forumNav())
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "Forum",
      orderBy: ["date", "desc"]
    },
    {
      collection: "PinnedForum",
      orderBy: ["date", "desc"]
    }
  ])
)(ForumContent);
