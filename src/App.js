import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, ToastStore } from "react-toasts";
import { Redirect } from "react-router-dom";
import "./App.scss";

//components
//import { moviesE } from "./components/home/media";
import Home from "./components/home/home";
import Login from "./components/auth/login";
import Register from "./components/auth/registration";
import authActions from "./components/auth/authActionsHandler";
import Profile from "./components/profile";
import Navbar from "./components/navbar/navbar";
import Forum from "./components/forum";
import SubmitNew from "./components/forum/submitNew";
import forumContent from "./components/forum/forumContent";
import ViewProfile from "./components/profile/profile";
//-----------------------------------------------------------------------------------------------------
class App extends Component {
  state = {};

  pageNotFound() {
    document.title = "404";
    return <Redirect to="/" />;
  }

  render() {
    return (
      <div>
        <div>
          <ToastContainer
            className="text-white"
            store={ToastStore}
            position={ToastContainer.POSITION.BOTTOM_LEFT}
          />
          <BrowserRouter>
            <div>
              <Navbar />
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} />
                <Route path="/registration" component={Register} />
                {/* <Route path="/extendedMovies" component={moviesE} /> */}
                <Route path="/auth" component={authActions} />
                <Route path="/profile" component={Profile} />
                <Route path="/forum" component={Forum} />
                <Route path="/topic/:id" component={forumContent} />
                <Route path="/newtopic/:forumid(1)" component={SubmitNew} />
                <Route path="/:username" component={ViewProfile} />
                <Route component={this.pageNotFound} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps)(App);
