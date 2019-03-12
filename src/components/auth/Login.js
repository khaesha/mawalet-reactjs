import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import GoogleAuth from "./GoogleAuth";
import GeneralAuth from "./GeneralAuth";

import history from "../../history";

class Login extends Component {
  componentDidMount() {
    if (
      window.localStorage.getItem("isSignedIn") &&
      window.localStorage.getItem("isSignedIn") === "1"
    ) {
      history.push("/dashboard");
    }
  }
  render() {
    return (
      <div>
        <Divider />
        <div className="ui segment">
          <GeneralAuth />
          <Divider />
          <GoogleAuth />
        </div>
      </div>
    );
  }
}

export { Login };
