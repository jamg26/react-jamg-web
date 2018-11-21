import React, { Component } from "react";
import { connect } from "react-redux";
import { removeDp, dp, newGender } from "../../store/actions/profileActions";
import { profile } from "../../store/actions/navActions";
import { newAge } from "../../store/actions/profileActions";
import { Age } from "./age";
import avatar from "./noprofile.jpg";
import { Dp } from "./dp";
import { Gender } from "./gender";
import { Loading } from "../../functions/loaders";
import { Redirect } from "react-router-dom";
class Profile extends Component {
  state = {
    age: "",
    ageInput: true,
    genderInput: true,
    dp: [],
    dpLoaded: false
  };
  componentDidMount() {
    document.title = "Profile | JamgPH";
    this.props.profile();
  }
  //dp
  dpNewOnChange(pictureFiles) {
    const validator = ["image/jpg", "image/jpeg", "image/png"];
    const imgType = pictureFiles.target.files[0]["type"];
    if (
      imgType === validator[0] ||
      imgType === validator[1] ||
      imgType === validator[2]
    ) {
      const imgPrev = URL.createObjectURL(pictureFiles.target.files[0]);
      this.setState({
        dp: imgPrev
      });
      this.props.dp(pictureFiles.target.files);
    } else {
      alert("Invalid file");
    }
  }
  removeDp = () => {
    this.props.removeDp();
  };
  openFile = e => {
    this.refs.fileUploader.click();
  };

  //age
  addAgeInput = () => {
    this.setState({ ageInput: false });
  };
  age = e => {
    this.setState({
      age: e.target.value
    });
  };
  submitAge = e => {
    e.preventDefault();
    if (this.state.age <= 5 || this.state.age >= 80) {
      alert("Out of range");
      this.setState({
        ageInput: false
      });
    } else {
      this.setState({
        ageInput: true
      });
      this.props.age(this.state.age);
    }
  };

  //gender
  addGenderInput = () => {
    this.setState({
      genderInput: false
    });
  };
  submitGender = e => {
    const g = e.target.value;
    if (
      g === "Male" ||
      g === "Female" ||
      g === "LGBT" ||
      g === "Prefer not to say"
    ) {
      this.setState({
        genderInput: true
      });
      this.props.gender(g);
    }
  };
  render() {
    if (!this.props.firebase.auth.uid) return <Redirect to="/" />;
    const { firebase } = this.props;
    const { ageInput } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      {firebase.auth.photoURL ? (
                        <div hidden={this.state.dpLoaded}>
                          <Loading />
                        </div>
                      ) : null}

                      <Dp
                        photoURL={
                          this.state.dp[0]
                            ? this.state.dp
                            : firebase.auth.photoURL
                        }
                        openFile={this.openFile}
                        removeDp={this.removeDp}
                        hidden={!this.state.dpLoaded}
                        onLoad={() => this.setState({ dpLoaded: true })}
                        avatar={avatar}
                      />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={this.dpNewOnChange.bind(this)}
                        ref="fileUploader"
                        style={{ display: "none" }}
                      />
                    </div>
                    {firebase.profile.firstName ? (
                      <ul className="list-unstyled quick-sand">
                        <div>
                          <li>
                            <h1 className="text-center">
                              {firebase.profile.firstName}{" "}
                              {firebase.profile.lastName}
                            </h1>
                          </li>
                          <li>
                            <hr />
                          </li>
                          <li>
                            {firebase.auth.email} (
                            {firebase.auth.emailVerified
                              ? "verified"
                              : "not verified"}
                            )
                          </li>
                          <li>
                            <Age
                              Age={firebase.profile.Age}
                              ageChange={this.age}
                              ageInput={ageInput}
                              addAgeInput={this.addAgeInput}
                              submitAge={this.submitAge}
                            />
                          </li>
                          <li>
                            <Gender
                              Gender={firebase.profile.Gender}
                              genderInput={this.state.genderInput}
                              addGenderInput={this.addGenderInput}
                              submitGender={this.submitGender}
                            />
                          </li>
                        </div>
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-block">
                <div className="card">
                  <div className="card-body">
                    <h3>Readme</h3>
                    <ul>
                      <li>Click image to add/change profile picture.</li>
                      <li>
                        Dont refresh your browser when updating a picture to
                        avoid corrupted image.
                      </li>
                      <li>
                        Only your current profile will be save in our database.
                        No matter how often you change it
                      </li>
                    </ul>
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
    firebase: state.firebase,
    auth: state.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeDp: () => dispatch(removeDp()),
    dp: data => dispatch(dp(data)),
    profile: () => dispatch(profile()),
    age: data => dispatch(newAge(data)),
    gender: data => dispatch(newGender(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
