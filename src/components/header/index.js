import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Divider } from "semantic-ui-react";

class Header extends Component {
  render() {
    return (
      <div>
        <Divider />
        <div className="ui borderless huge menu">
          <div className="header item">M</div>
          <NavLink to="/" className="item">
            Home
          </NavLink>
          <NavLink to="/summary/report" className="item">
            Report
          </NavLink>
          <NavLink to="#" className="ui right floated item">
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
