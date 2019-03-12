import React, { Component } from "react";

import history from '../../history';

class GoogleAuth extends Component {
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
          console.log("[GoogleAuth] onLoadGoogleApi err", err);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      // Set current user id into db or session or localStorage
      const {
        access_token,
        expires_at,
        expires_in,
        first_issued_at,
        id_token,
        token_type
      } = this.auth.currentUser.get().getAuthResponse();
      window.localStorage.setItem("auth", "google");
      window.localStorage.setItem("isSignedIn", 1);
      window.localStorage.setItem("access_token", access_token);
      window.localStorage.setItem("expires_at", expires_at);
      window.localStorage.setItem("expires_in", expires_in);
      window.localStorage.setItem("first_issued_at", first_issued_at);
      window.localStorage.setItem("id_token", id_token);
      window.localStorage.setItem("token_type", token_type);

      history.push('/dashboard');
    } else {
      // Clear session
      this.auth.signOut();
      // window.localStorage.clear();
    }
  };

  onSignInHandler = () => {
    this.auth.signIn();
  };

  render() {
    return (
      <div>
        <button
          className="ui fluid red google button"
          onClick={this.onSignInHandler}
        >
          <i className="google icon" /> Sign In with Google
        </button>
      </div>
    );
  }
}

export default GoogleAuth;
