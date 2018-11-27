import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProfile } from "../../store/actions/profileActions";
class ViewProfile extends Component {
  state = {
    username: this.props.match.params.username
  };
  componentDidMount() {
    this.props.fetch(this.state);
    if (this.state.username === this.props.profile.username)
      console.log("redirect");
  }
  render() {
    const { profile } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center">
                        {!profile.avatar ? null : (
                          <div>
                            <img
                              className="dp-view rounded-circle"
                              src={profile.avatar}
                              alt="DefaultPicture"
                            />
                            <h1 className="quick-sand">
                              {profile.firstName} {profile.lastName}
                            </h1>
                          </div>
                        )}
                      </div>
                      <hr />
                      {!profile.age ? null : (
                        <ul className="list-unstyled quick-sand">
                          <li>Age: {profile.age}</li>
                          <li>Gender: {profile.gender}</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-none d-md-block">
                  <div className="card">
                    <div className="card-body">
                      {profile.status ? (
                        <div>
                          <h3>Hi</h3>
                          <ul className="list-unstyled">
                            <li>Welcome to my profile.</li>
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
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
    auth: state.firebase.auth,
    profile: state.profile,
    fetchProfile: state.firebase.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetch: data => dispatch(fetchProfile(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile);
