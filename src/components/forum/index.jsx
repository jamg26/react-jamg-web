import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { ToastStore } from "react-toasts";
import moment from "moment";
import { Link } from "react-router-dom";
import { forumNav } from "../../store/actions/navActions";
import { Redirect } from "react-router-dom";
class Forum extends Component {
  componentDidMount() {
    document.title = "Forum";
    this.props.forumNav();
  }
  render() {
    const { forum, pinned, auth } = this.props;
    if (!auth.uid || !auth.emailVerified) {
      ToastStore.error("Auth needed!");
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <h5 className="card-titles text-dark m-3">
                Mini-Forum
                <br />
                <Link
                  to="/newtopic/1"
                  className="btn btn-primary float-right btn-sm"
                >
                  Submit New Topic
                </Link>
              </h5>
              <div className="card-body">
                <ul className="list-unstyled">
                  {pinned &&
                    pinned.map(p => {
                      return (
                        <li key={p.id}>
                          <Link to={"/topic/" + p.id}>
                            <ul className="list-unstyled shadow-sm p-2 mb-3 bg-white rounded">
                              <i className="fas fa-thumbtack" />{" "}
                              <b>{p.title}</b>
                              <small>
                                <li>
                                  Posted by: {p.author}{" "}
                                  {moment(p.date.toDate()).calendar()}
                                </li>
                              </small>
                            </ul>
                          </Link>
                        </li>
                      );
                    })}
                  {forum &&
                    forum.map((f, index) => {
                      return (
                        <li key={f.id}>
                          <Link to={"/topic/" + f.id}>
                            <ul className="list-unstyled shadow-sm p-2 mb-3 bg-white rounded">
                              <b>{f.title}</b>
                              <small>
                                <li>
                                  Posted by: {f.author}{" "}
                                  {moment(f.date.toDate()).calendar()}
                                </li>
                              </small>
                            </ul>
                          </Link>
                        </li>
                      );
                    })}
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
    forum: state.firestore.ordered.Forum,
    pinned: state.firestore.ordered.PinnedForum,
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
    { collection: "PinnedForum", orderBy: ["date", "desc"] }
  ])
)(Forum);
