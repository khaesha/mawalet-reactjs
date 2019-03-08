import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

import GoogleAuth from "./GoogleAuth";
import GeneralAuth from "./GeneralAuth";

import history from "../../history";

class Login extends Component {
  onSubmitHandler = status => {
    if (!status.error) {
      history.push(status.pathname);
    }
  };

  render() {
    return (
      <div>
        <Divider />
        <div className="ui segment">
          <GeneralAuth onSubmit={this.onSubmitHandler} />
          <Divider />
          <GoogleAuth onSubmit={this.onSubmitHandler} />
        </div>
      </div>
    );
  }
}

export { Login };
