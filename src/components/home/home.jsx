import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { WindowsBtn, AndroidBtn, OsBtn } from "./softwares";
import { PageHeader } from "react-bootstrap";
import {
  home,
  windows,
  android,
  os,
  movies,
  about,
  iplocator,
  youtubetomp3
} from "../../store/actions/layoutActions";
import { verifyEmail } from "../../store/actions/authActions";
import { ContentHandler } from "../../functions/contentHandler";
import { MobileHandler } from "./mobileHandler";
import { dashboard } from "../../store/actions/navActions";
import { NonAuthContent, AuthContent } from "./authContent";
import { Loading } from "../../functions/loaders";
import Webchat from "../webchat";
class Home extends Component {
  state = {};
  componentDidMount() {
    this.props.dashboard();
  }

  defaultContent() {
    const { profile } = this.props;
    if (!profile.firstName) {
      return <Loading />;
    }
    return (
      <div>
        <Webchat />
        {/* <DashNote firstName={profile.firstName} about={this.props.about} /> */}
      </div>
    );
  }
  APIipLocator() {
    return (
      <ContentHandler
        click={this.props.iplocator}
        className="fas fa-map-marked-alt fa-lg text-warning"
        name="IP Locator"
      />
    );
  }
  APIYoutube() {
    return (
      <ContentHandler
        click={this.props.youtube}
        className="fab fa-youtube fa-lg text-danger"
        name="Youtube to mp3"
      />
    );
  }
  Softwares() {
    return (
      <div>
        <WindowsBtn click={this.props.windows} />
        <AndroidBtn click={this.props.android} />
        <OsBtn click={this.props.os} />
      </div>
    );
  }
  Media() {
    return (
      <ContentHandler
        click={this.props.movies}
        className="fas fa-film fa-lg text-success"
        name="Movies"
      />
    );
  }
  Others() {
    return (
      <ContentHandler
        click={this.props.about}
        className="fas fa-users fa-lg text-primary"
        name="About"
      />
    );
  }
  HomeButton() {
    return (
      <ContentHandler
        click={this.props.home}
        className="fas fa-home fa-lg"
        name="Home"
      />
    );
  }
  Content() {
    const { layout, auth, email } = this.props;
    if (!auth.emailVerified) {
      document.title = "Home | JamgPH";
      return (
        <div className="col-md-6">
          <br className="d-block d-md-none" />
          <div className="card">
            <div className="card-body">
              <NonAuthContent
                email={auth.email}
                sendEmailButton={email.sendEmailButton}
                sendVerification={this.sendVerification}
                btnDisabled={this.state.button}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-md-6">
          <br className="d-block d-md-none" />
          {layout.default ? (
            ((document.title = "Home | JamgPH"), this.defaultContent())
          ) : (
            <div className="card">
              <div className="card-body">
                <AuthContent
                  windows={layout.windows}
                  android={layout.android}
                  os={layout.os}
                  movies={layout.movies}
                  ip={layout.ip}
                  yt={layout.yt}
                  about={layout.about}
                />
              </div>
            </div>
          )}
        </div>
      );
    }
  }
  render() {
    const { auth, layout } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="container home">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <ul>
                  <li className="list-unstyled d-none d-md-block">
                    <PageHeader>
                      <small className="abel">Navigation</small>
                    </PageHeader>
                    <ul className="list-unstyled quick-sand">
                      {this.HomeButton()}
                      {this.Softwares()}
                      {this.Media()}
                      {this.APIipLocator()}
                      {this.APIYoutube()}
                      {this.Others()}
                    </ul>
                  </li>
                </ul>
                <MobileHandler
                  home={this.props.home}
                  windows={this.props.windows}
                  android={this.props.android}
                  os={this.props.os}
                  movies={this.props.movies}
                  iplocator={this.props.iplocator}
                  youtube={this.props.youtube}
                  about={this.props.about}
                  homeClass={layout.default}
                  windowClass={layout.windows}
                  androidClass={layout.android}
                  osClass={layout.os}
                  movieClass={layout.movies}
                  ipClass={layout.ip}
                  ytClass={layout.yt}
                  aboutClass={layout.about}
                />
              </div>
            </div>
          </div>
          {this.Content()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    layout: state.layout,
    email: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    home: () => dispatch(home()),
    windows: () => dispatch(windows()),
    android: () => dispatch(android()),
    os: () => dispatch(os()),
    movies: () => dispatch(movies()),
    about: () => dispatch(about()),
    iplocator: () => dispatch(iplocator()),
    youtube: () => dispatch(youtubetomp3()),
    sendEmail: () => dispatch(verifyEmail()),
    dashboard: () => dispatch(dashboard())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
