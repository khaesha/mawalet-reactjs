import React, { Component } from "react";
import history from '../../history';

class Logout extends Component {
  componentDidMount() {
    this.onLoadGoogleApi();
  }

  onLoadGoogleApi() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: "",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());

          this.auth.isSignedIn.listen(this.onAuthChange);
        })
        .catch(err => {
          console.log("[Logout] onLoadGoogleApi err", err);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (!isSignedIn) {
      this.onLogoutHandler();
    }
  };

  onLogoutHandler = () => {
    const conf = window.confirm("Are you sure want to logout?");
    if (conf) {
      if (
        window.localStorage.getItem("auth") &&
        window.localStorage.getItem("auth") === "google"
      ) {
        this.auth.signOut();
      }
      window.localStorage.clear();
      history.push("/");
    }
  };

  render() {
    return <div onClick={this.onLogoutHandler}>Logout</div>;
  }
}

export { Logout };
