import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import Header from "./header";
import { CashFlowList, CashFlowCreate, CashFlowDelete } from "./cashflow";
import Report from "./report";
import Login from "./login";

import history from '../history';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isSignedIn: false };
  }

  componentDidMount() {
    if (window.localStorage.getItem('isSignedIn') === 'true') {
      this.setState({ isSignedIn: true });
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Redirect to="/login" />
      </Switch>
    );

    if (this.state.isSignedIn) {
      routes = (
        <div>
          <Header />
          <Switch>
            <Route path="/cash-flow/create" component={CashFlowCreate} />
            <Route path="/cash-flow/delete/:id" component={CashFlowDelete} />
            <Route path="/summary/report" component={Report} />
            <Route path="/" exact component={CashFlowList} />
            <Redirect to="/" />
          </Switch>
        </div>
      );
    }

    return <div className="ui text container">{routes}</div>;
  }
}

export default withRouter(App);
