import React, { Component } from "react";
import { connect } from "react-redux";
import { newTopic } from "../../store/actions/forumActions";
import { Link } from "react-router-dom";
class SubmitNew extends Component {
  componentDidMount() {
    document.title = "Creating New Topic";
  }
  state = {
    title: "",
    message: "",
    author: null,
    disabled: true,
    done: false,
    photoURL: null
  };
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      author: this.props.profile.firstName,
      disabled: false,
      photoURL: this.props.auth.photoURL
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState({
      disabled: true,
      done: true
    });
    this.props.newTopic(this.state);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <h5 className="card-titles text-dark m-3">
                New Topic
                <br />
              </h5>
              <div className="card-body">
                <div className="form-group">
                  {this.state.done ? (
                    <div>
                      <p>{this.props.forum.newtopic}</p>
                      <Link to="/forum">Back to Forum</Link>
                    </div>
                  ) : (
                    <form onSubmit={this.onSubmit}>
                      <p>Forum Title</p>
                      <input
                        id="title"
                        onChange={this.onChange}
                        type="text"
                        className="form-control col-md-5 mb-4"
                        //required
                      />
                      <p>Body</p>
                      <textarea
                        id="message"
                        onChange={this.onChange}
                        className="form-control col-md-5 mb-4"
                        rows="6"
                        //required
                      />
                      <button
                        //  disabled={this.state.disabled}
                        type="submit"
                        className="btn btn-primary btn-small"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </div>
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
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    forum: state.forum
  };
};
const mapDispatchToProps = dispatch => {
  return {
    newTopic: data => dispatch(newTopic(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitNew);
