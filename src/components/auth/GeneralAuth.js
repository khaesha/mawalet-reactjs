import React, { Component } from "react";

import mawalet from "../../api/mawalet";

class GeneralAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  onSubmitHandler = async () => {
    console.log("[GeneralAuth][onSubmitHandler] init");

    const response = await mawalet.post("/auth/getToken", { ...this.state });

    if (response.data.err_no === 0) {
      // set localStorage
      window.localStorage.setItem("isLoggedIn", 1);
      window.localStorage.setItem("token", response.data.data.token);
      window.localStorage.setItem("auth", "auth");

      this.props.onSubmit({ error: false, pathname: "/" });
    } else {
      // give error notice
      alert(response.data.message);
    }
  };

  render() {
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <input
              type="text"
              placeholder="Email"
              onChange={event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <button
            className="ui fluid blue button"
            type="button"
            onClick={this.onSubmitHandler}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default GeneralAuth;
