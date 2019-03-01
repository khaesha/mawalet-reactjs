import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

class Login extends Component {
  render() {
    return (
      <div class="ui text container">
        <Divider />
        <div class="ui segment">
          <form class="ui form">
            <div class="field">
              <input type="text" placeholder="Email" />
            </div>
            <div class="field">
              <input type="text" placeholder="Password" />
            </div>
            <button class="ui fluid blue button" type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
