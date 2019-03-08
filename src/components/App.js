import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

import Header from "./header";
import { CashFlowList, CashFlowCreate, CashFlowDelete } from "./cashflow";
import Report from "./report";
import { Login } from "./auth";

import history from "../history";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isSignedIn: false };
  }

  componentDidMount() {
    if (
      window.localStorage.getItem("isSignedIn") &&
      window.localStorage.getItem("isSignedIn") === "1"
    ) {
      this.setState({ isSignedIn: true });
    }
  }

  render() {
    let routes = <Route path="/" exact component={Login} />;

    if (this.state.isSignedIn) {
      routes = (
        <div>
          <Header />
          <Route path="/" exact component={CashFlowList} />
          <Route path="/cash-flow/create" exact component={CashFlowCreate} />
          <Route
            path="/cash-flow/delete/:id"
            exact
            component={CashFlowDelete}
          />
          <Route path="/summary/report" exact component={Report} />
        </div>
      );
    }

    return (
      <div className="ui container">
        <Router history={history}>{routes}</Router>
      </div>
    );
  }
}

export default App;
