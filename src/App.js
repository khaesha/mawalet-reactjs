import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// import Login from "./components/login";
import Header from "./components/header";
// import FormCashFlow from "./components/form-cashflow";
// import Cashflow from "./components/cashflow";

import { CashFlowList, CashFlowCreate, CashFlowDelete } from './components/cashflow'

class App extends Component {
  render() {
    return (
      <div className="ui text container">
        <BrowserRouter>
          <div>
            {/* Login to Component */}
            {/* <Login /> */}
            {/* Header to Component */}
            <Header />
            {/* Main content to Component */}
            <Route path="/" exact component={CashFlowList}></Route>
            {/* Main form input content to Component */}
            <Route path="/cash-flow/create" exact component={CashFlowCreate}></Route>
            <Route path="/cash-flow/delete/:id" exact component={CashFlowDelete}></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
